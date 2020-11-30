import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { OrderDto, GetOrdersFilterDto } from './order.dto';
import { Order } from './order.entity';
import { Item } from '../item/item.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async getOrders(getOrdersFilterDto: GetOrdersFilterDto): Promise<Order[]> {
    const { name, email } = getOrdersFilterDto;
    const query = this.createQueryBuilder('order').leftJoinAndSelect('order.items', 'items');
    if (name) query.andWhere('order.name LIKE :name', { name: `%${name}%` });
    if (email) query.andWhere('order.email LIKE :email', { email: `%${email}%` });
    const order = await query.getMany();
    return order;
  }

  async createOrder(createOrderDto: OrderDto, items: Item[]): Promise<Order> {
    const { name, phone, email, deliveryDate, delivery, notes, language } = createOrderDto;
    const address = `${createOrderDto.address.postalCode} ${createOrderDto.address.settlement}, ${createOrderDto.address.street}; ${createOrderDto.address.country}`;
    const grandTotal = this.countGrandTotalAmount(items);
    const order = new Order({ name, phone, email, address, grandTotal, deliveryDate, delivery, notes, items, language });
    return await order.save();
  }

  async updateOrder(order: Order, updateOrderDto: OrderDto, items: Item[]): Promise<Order> {
    const { name, phone, email, deliveryDate, delivery, notes, language } = updateOrderDto;
    const address = `${updateOrderDto.address.postalCode} ${updateOrderDto.address.settlement}, ${updateOrderDto.address.street}; ${updateOrderDto.address.country}`;
    const grandTotal = this.countGrandTotalAmount(items);
    if (updateOrderDto.items.length === items.length) {
      order.name = name;
      order.phone = phone;
      order.email = email;
      order.address = address;
      order.grandTotal = grandTotal;
      order.deliveryDate = deliveryDate;
      order.delivery = delivery;
      order.notes = notes;
      order.items = items;
      order.language = language;
      return order.save();
    } else {
      throw new NotFoundException('Could not find all the items!');
    }
  }

  private countGrandTotalAmount(items: Item[]): number {
    return items.map(item => item.price).reduce((acc, cur) => acc + cur, 0);
  }
}
