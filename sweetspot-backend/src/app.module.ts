import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { RateLimiterInterceptor, RateLimiterModule } from 'nestjs-rate-limiter';
import { MulterModule } from '@nestjs/platform-express';
import * as config from 'config';

import { typeOrmConfig } from './config/ormconfig';
import { FrontendMiddleware } from './config/frontend.middleware';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './order/order.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { ItemModule } from './item/item.module';
import { EmailModule } from './email/email.module';
const limiterConf = config.get('limiter');
const mailConf = config.get('mail');

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    RateLimiterModule.register({
      points: limiterConf.points,
      duration: limiterConf.duration,
      keyPrefix: limiterConf.keyPrefix,
      type: limiterConf.type,
    }),
    MailerModule.forRoot({
      transport: {
        host: mailConf.host,
        port: mailConf.port,
        secure: mailConf.secure,
        auth: {
          user: mailConf.email,
          pass: process.env.EMAIL,
        },
      },
      defaults: {
        from: `"${mailConf.name}" <${mailConf.email}>`,
      },
      template: {
        dir: __dirname + '/email',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    MulterModule.register({
      dest: './assets',
    }),
    AuthModule,
    OrdersModule,
    IngredientModule,
    ItemModule,
    EmailModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RateLimiterInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(FrontendMiddleware).forRoutes({
      path: '/**',
      method: RequestMethod.ALL,
    });
  }
}
