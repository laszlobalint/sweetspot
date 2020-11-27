import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as config from 'config';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const server = config.get('server');
  const app = await NestFactory.create(AppModule);
  process.env.NODE_ENV === config.get('mode.development') ? app.enableCors() : app.enableCors({ origin: server.origin });
  app.use(helmet());
  await app.listen(process.env.PORT || server.port);
}

bootstrap();
