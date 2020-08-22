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
    const { name, phone, email, price, delivery } = createOrderDto;
    const address = `${createOrderDto.address.postalCode} ${createOrderDto.address.settlement}, ${createOrderDto.address.street}; ${createOrderDto.address.country}`;
    const order = new Order({ name, phone, email, address, price, delivery, items });
    return await order.save();
  }

  async updateOrder(order: Order, updateOrderDto: OrderDto, items: Item[]): Promise<Order> {
    const { name, phone, email, price, delivery } = updateOrderDto;
    const address = `${updateOrderDto.address.postalCode} ${updateOrderDto.address.settlement}, ${updateOrderDto.address.street}; ${updateOrderDto.address.country}`;
    if (updateOrderDto.items.length === items.length) {
      order.name = name;
      order.phone = phone;
      order.email = email;
      order.address = address;
      order.price = price;
      order.delivery = delivery;
      order.items = items;
      return order.save();
    } else {
      throw new NotFoundException('Could not find all the items!');
    }
  }
}
