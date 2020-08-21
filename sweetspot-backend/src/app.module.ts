import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateLimiterInterceptor, RateLimiterModule } from 'nestjs-rate-limiter';

import { typeOrmConfig } from './config/typeorm.config';
import { FrontendMiddleware } from './config/frontend.middleware';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    RateLimiterModule.register({
      points: 200,
      duration: 60,
      keyPrefix: 'global',
      type: 'Memory',
    }),
    AuthModule,
    OrdersModule,
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
