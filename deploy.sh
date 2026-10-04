#!/usr/bin/env bash
set -euo pipefail
umask 007
cd "$(dirname "$0")"

# Required env (passed from the workflow): ENV_B64, IMAGE, GHCR_USER, GHCR_TOKEN
: "${ENV_B64:?}" "${IMAGE:?}" "${GHCR_USER:?}" "${GHCR_TOKEN:?}"

trap 'docker logout ghcr.io >/dev/null 2>&1 || true' EXIT

COMPOSE="docker compose -f docker-compose.prod.yml --env-file deploy.env"

write_deploy_env() {
  printf 'IMAGE=%s\nAPP_PORT=%s\n' "$1" "$APP_PORT" > deploy.env.new
  chmod 600 deploy.env.new
  mv deploy.env.new deploy.env
}

# 1. App env file (validate, then atomic swap)
printf '%s' "$ENV_B64" | base64 -d > .env.production.new
sed -i 's/\r$//' .env.production.new
test -s .env.production.new
grep -q '^PORT=' .env.production.new
chmod 600 .env.production.new
mv .env.production.new .env.production

APP_PORT=$(grep '^PORT=' .env.production | cut -d= -f2-)
test -n "$APP_PORT"

# 2. Last known-good image (only written after a passed health check)
PREVIOUS_IMAGE=$(grep '^IMAGE=' last_good.env 2>/dev/null | cut -d= -f2- || true)

# 3. Login, pull, migrate, start
echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USER" --password-stdin
write_deploy_env "$IMAGE"
$COMPOSE pull server
$COMPOSE run --rm -T --entrypoint pnpm server migration:run:prod
$COMPOSE up -d --remove-orphans

# 4. Health check
healthy=false
for i in $(seq 1 10); do
  if curl -sf "http://localhost:${APP_PORT}/api/health" >/dev/null; then
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