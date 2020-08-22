import { EntityRepository, Repository } from 'typeorm';

import { OrderDto, GetOrdersFilterDto } from './order.dto';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemRepository } from 'src/item/item.repository';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  constructor(@InjectRepository(ItemRepository) private readonly itemRepository: ItemRepository) {
    super();
  }

  async getOrders(getOrdersFilterDto: GetOrdersFilterDto): Promise<Order[]> {
    const { name, email } = getOrdersFilterDto;
    const query = this.createQueryBuilder('order');
    if (name) query.andWhere('order.name LIKE :name', { name: `%${name}%` });
    if (email) query.andWhere('order.email LIKE :email', { email: `%${email}%` });
    const order = await query.getMany();
    return order;
  }

  async createOrder(createOrderDto: OrderDto): Promise<Order> {
    const { name, phone, email, price, delivery, items } = createOrderDto;
    const address = `${createOrderDto.address.postalCode} ${createOrderDto.address.settlement}, ${createOrderDto.address.street}; ${createOrderDto.address.country}`;
    const itemsForOrder = await this.itemRepository.findByIds(items);
    const order = new Order({ name, phone, email, address, price, delivery, items: itemsForOrder });
    return await order.save();
  }

  updateOrder(updateOrderDto: OrderDto, id: number): Order {
    return {
      id,
      name: updateOrderDto.name,
      phone: updateOrderDto.phone,
      email: updateOrderDto.email,
      address: `${updateOrderDto.address.postalCode} ${updateOrderDto.address.settlement}, ${updateOrderDto.address.street}; ${updateOrderDto.address.country}`,
      price: updateOrderDto.price,
      delivery: updateOrderDto.delivery,
      items: [],
    } as Order;
  }
}
