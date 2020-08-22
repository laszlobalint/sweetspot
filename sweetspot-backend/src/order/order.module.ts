import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderController } from './order.controller';
import { AuthModule } from '../auth/auth.module';
import { OrdersService } from './order.service';
import { OrderRepository } from './order.repository';
import { ItemRepository } from 'src/item/item.repository';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([OrderRepository, ItemRepository])],
  controllers: [OrderController],
  providers: [OrdersService],
})
export class OrdersModule {}
