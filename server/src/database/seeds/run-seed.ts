import { NestFactory } from '@nestjs/core';
import { ProductSizeSeedService } from './product-size/product-size-seed.service';
import { RoleSeedService } from './role/role-seed.service';
import { SeedModule } from './seed.modute';
import { StatusSeedService } from './status/status-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(RoleSeedService).run();

  await app.get(StatusSeedService).run();

  await app.get(ProductSizeSeedService).run();
};

void runSeed();
