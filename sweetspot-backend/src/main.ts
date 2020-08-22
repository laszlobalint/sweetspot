import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const server = config.get('server');
  const app = await NestFactory.create(AppModule);
  process.env.NODE_ENV === config.get('mode.development') ? app.enableCors() : app.enableCors({ origin: server.origin });
  app.use(helmet());
  await app.listen(process.env.PORT || server.port);
}
bootstrap();
