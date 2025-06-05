import { NestFactory } from '@nestjs/core';
import { AdminApiModule } from './admin-api.module';

async function bootstrap() {
  const app = await NestFactory.create(AdminApiModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
