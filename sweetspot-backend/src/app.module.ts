import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './order/order.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
