import { Injectable, NotFoundException, ServiceUnavailableException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

import { OrderDto, GetOrdersFilterDto } from './order.dto';
import { Order } from './order.entity';
import { EmailService } from '../email/email.service';
import { OrderRepository } from './order.repository';
import { ItemRepository } from '../item/item.repository';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository) private readonly orderRepository: OrderRepository,
    @InjectRepository(ItemRepository) private readonly itemRepository: ItemRepository,
    private readonly emailService: EmailService,
  ) {}

  async getOrders(getOrdersFilterDto: GetOrdersFilterDto): Promise<Order[]> {
    return this.orderRepository.getOrders(getOrdersFilterDto);
  }

  async getOrder(id: number): Promise<Order> {
    const foundOrder = await this.orderRepository.findOne(id, { relations: ['items'] });
    if (!foundOrder) throw new NotFoundException();
    return foundOrder;
  }

  async createOrder(createOrderDto: OrderDto): Promise<Order> {
    const itemsForOrder = await this.itemRepository.findByIds(createOrderDto.items, { relations: ['ingredients'] });
    const order = await this.orderRepository.createOrder(createOrderDto, itemsForOrder);
    if (!order) throw new UnprocessableEntityException('Could not save the order');
    const result = await this.emailService.sendEmail(createOrderDto.email, order);
    if (result instanceof Order) return result;
    else throw new ServiceUnavailableException('Email could not be sent');
  }

  async updateOrder(id: number, updateOrderDto: OrderDto): Promise<Order> {
    const oldOrder = await this.getOrder(id);
    const itemsForOrder = await this.itemRepository.findByIds(updateOrderDto.items, { relations: ['ingredients'] });
    if (!oldOrder) throw new NotFoundException();
    return this.orderRepository.updateOrder(oldOrder, updateOrderDto, itemsForOrder);
  }

  async deleteOrder(id: number): Promise<DeleteResult> {
    const deleteResult = await this.orderRepository.delete(id);
    if (!deleteResult.affected) throw new NotFoundException();
    return deleteResult;
  }
}
