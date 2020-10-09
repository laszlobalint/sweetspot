import { NestFactory } from '@nestjs/core';
import * as config from 'config';
import * as helmet from 'helmet';

/* eslint-disable @typescript-eslint/no-unused-expressions, @typescript-eslint/no-unused-vars */
import * as locale from 'locale-codes';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const server = config.get('server');
  const app = await NestFactory.create(AppModule);
  process.env.NODE_ENV === config.get('mode.development') ? app.enableCors() : app.enableCors({ origin: server.origin });
  app.use(helmet());

  const event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  console.log(event.toLocaleDateString('hu-HU', options));

  await app.listen(process.env.PORT || server.port);
}
bootstrap();
