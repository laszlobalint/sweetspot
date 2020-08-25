import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderController } from './order.controller';
import { AuthModule } from '../auth/auth.module';
import { OrderService } from './order.service';
import { ItemModule } from '../item/item.module';
import { EmailModule } from '../email/email.module';
import { OrderRepository } from './order.repository';
import { ItemRepository } from '../item/item.repository';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([OrderRepository, ItemRepository]), ItemModule, EmailModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrdersModule {}
