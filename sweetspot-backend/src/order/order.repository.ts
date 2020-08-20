import { EntityRepository, Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto, GetOrdersFilterDto } from './order.dto';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async getOrders(getOrdersFilterDto: GetOrdersFilterDto): Promise<Order[]> {
    const { name, email } = getOrdersFilterDto;
    const query = this.createQueryBuilder('order');
    if (name) query.andWhere('order.name LIKE :name', { name: `%${name}%` });
    if (email) query.andWhere('order.email LIKE :email', { email: `%${email}%` });
    const order = await query.getMany();
    return order;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = new Order();
    order.name = createOrderDto.name;
    order.phone = createOrderDto.phone;
    order.email = createOrderDto.email;
    order.address = `${createOrderDto.address.postalCode} ${createOrderDto.address.settlement}, ${createOrderDto.address.street}; ${createOrderDto.address.country}`;
    order.price = createOrderDto.price;
    order.delivery = createOrderDto.delivery;
    // TO-DO: Find and add items!
    order.items = [];
    await order.save();
    return order;
  }
}
