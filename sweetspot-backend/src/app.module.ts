import { Module } from '@nestjs/common';
import { OrdersModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
