import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderController } from './order.controller';
import { AuthModule } from '../auth/auth.module';
import { OrderService } from './order.service';
import { EmailService } from 'src/email/email.service';
import { OrderRepository } from './order.repository';
import { ItemRepository } from '../item/item.repository';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([OrderRepository, ItemRepository])],
  controllers: [OrderController],
  providers: [OrderService, EmailService],
})
export class OrdersModule {}
