import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrdersService } from './order.service';
import { OrderRepository } from './order.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderRepository])],
  controllers: [OrderController],
  providers: [OrdersService],
})
export class OrdersModule {}
