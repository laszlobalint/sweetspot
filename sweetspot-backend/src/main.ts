import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === config.get('mode.development')) app.enableCors();
  app.use(helmet());
  const server = config.get('server');
  await app.listen(process.env.PORT || server.port);
}
bootstrap();
