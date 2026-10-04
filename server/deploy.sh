#!/usr/bin/env bash
set -euo pipefail
umask 007
cd "$(dirname "$0")"

# Required env (passed from the workflow): ENV_B64, IMAGE, GHCR_USER, GHCR_TOKEN
: "${ENV_B64:?}" "${IMAGE:?}" "${GHCR_USER:?}" "${GHCR_TOKEN:?}"

trap 'docker logout ghcr.io >/dev/null 2>&1 || true' EXIT

COMPOSE="docker compose -f docker-compose.prod.yml --env-file deploy.env"

write_deploy_env() {
  printf 'IMAGE=%s\nAPP_PORT=%s\nAPI_PREFIX=%s\n' "$1" "$APP_PORT" "$API_PREFIX" > deploy.env.new
  chmod 600 deploy.env.new
  mv deploy.env.new deploy.env
}

# 1. App env file (validate, then atomic swap)
printf '%s' "$ENV_B64" | base64 -d > .env.production.new
sed -i 's/\r$//' .env.production.new

if [ ! -s .env.production.new ]; then
  echo "ERROR: decoded env file is empty"
  exit 1
fi

if ! grep -q '^APP_PORT=' .env.production.new; then
  echo "ERROR: no APP_PORT= line in env file. Keys found:"
  cut -d= -f1 .env.production.new | sed 's/^/  - /'
  exit 1
fi

chmod 600 .env.production.new
mv .env.production.new .env.production

# Read a KEY=value from .env.production (strips quotes)
get_env() {
  grep -m1 "^$1=" .env.production | cut -d= -f2- | tr -d "\"'"
}

APP_PORT=$(get_env APP_PORT)
API_PREFIX=$(get_env API_PREFIX)

[ -n "$APP_PORT" ]   || { echo "ERROR: APP_PORT missing or empty";   exit 1; }
[ -n "$API_PREFIX" ] || { echo "ERROR: API_PREFIX missing or empty"; exit 1; }

# 2. Last known-good image (only written after a passed health check)
PREVIOUS_IMAGE=$(grep '^IMAGE=' last_good.env 2>/dev/null | cut -d= -f2- || true)

# 3. Login, pull, migrate, start
echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USER" --password-stdin
write_deploy_env "$IMAGE"
$COMPOSE pull server
$COMPOSE run --rm -T --entrypoint npm server run migration:run:prod
$COMPOSE up -d --remove-orphans

# 4. Health check
healthy=false
for i in $(seq 1 10); do
  if curl -sf "http://localhost/api/health" >/dev/null; then
    echo "Health check passed on attempt $i"
    healthy=true
    break
  fi
  echo "Attempt $i/10 failed, retrying in 5s..."
  sleep 5
done

# 5. Success or rollback
if [ "$healthy" = true ]; then
  cp deploy.env last_good.env
  docker image prune -af --filter "until=168h"
  echo "Deployment verified successfully."
else
  echo "Health check failed."
  if [ -n "$PREVIOUS_IMAGE" ]; then
    echo "Rolling back to $PREVIOUS_IMAGE"
    write_deploy_env "$PREVIOUS_IMAGE"
    $COMPOSE pull server
    $COMPOSE up -d --remove-orphans
    echo "Rollback completed."
  else
    echo "No previous image found, manual intervention required."
  fi
  exit 1
fi
