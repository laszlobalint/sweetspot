import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { GetOrdersFilterDto, Delivery } from './order.dto';
import { OrderService } from './order.service';
import { EmailService } from '../email/email.service';
import { OrderRepository } from './order.repository';
import { ItemRepository } from '../item/item.repository';

const mockEmailRepository = () => ({
  sendEmail: jest.fn(),
});
const mockOrderRepository = () => ({
  getOrders: jest.fn(),
  createOrder: jest.fn(),
  updateOrder: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});
const mockItemRepository = () => ({
  findByIds: jest.fn(),
});

describe('OrderService', () => {
  let orderService;
  let emailService;
  let orderRepository;
  let itemRepository;

  const mockOrder = {
    name: 'Test name',
    phone: 'Test phone',
    email: 'Test email',
    address: 'Test address',
    price: 100,
    delivery: Delivery.PICK_UP,
    items: [1],
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: EmailService, useFactory: mockEmailRepository },
        { provide: OrderRepository, useFactory: mockOrderRepository },
        { provide: ItemRepository, useFactory: mockItemRepository },
      ],
    }).compile();

    orderService = await module.get<OrderService>(OrderService);
    orderRepository = await module.get<OrderRepository>(OrderRepository);
    emailService = await module.get<EmailService>(EmailService);
    itemRepository = await module.get<ItemRepository>(ItemRepository);
  });

  describe('getOrders', () => {
    it('call orderRepository.find() gets all orders', async () => {
      orderRepository.getOrders.mockResolvedValue('value');
      expect(orderRepository.getOrders).not.toHaveBeenCalled();
      const filters: GetOrdersFilterDto = { name: 'test', email: 'test' };
      const result = await orderService.getOrders(filters);
      expect(orderRepository.getOrders).toHaveBeenCalled();
      expect(result).toEqual('value');
    });
  });

  describe('getOrderByID', () => {
    it('call orderRepository.findOne() and successfully retrieve and return an order', async () => {
      orderRepository.findOne.mockResolvedValue(mockOrder);
      const result = await orderService.getOrder(1);
      expect(result).toEqual(mockOrder);
      expect(orderRepository.findOne).toHaveBeenCalledWith(1, { relations: ['items'] });
    });

    it('throws an error as order is not found', () => {
      orderRepository.findOne.mockResolvedValue(null);
      const action = async () => {
        await orderService.getOrder(5);
      };
      expect(action()).rejects.toThrow(NotFoundException);
    });
  });

  describe('createOrder', () => {
    it('calls orderRepository.createOrder() and returns the result', async () => {
      orderRepository.createOrder.mockResolvedValue('order');
      expect(orderRepository.createOrder).not.toHaveBeenCalled();
      const result = await orderRepository.createOrder(mockOrder);
      expect(orderRepository.createOrder).toHaveBeenCalledWith(mockOrder);
      expect(result).toEqual('order');
    });
  });

  describe('deleteOrder', () => {
    it('calls orderRepository.delete() to delete an order', async () => {
      orderRepository.delete.mockResolvedValue({ affected: 1 });
      expect(orderRepository.delete).not.toHaveBeenCalled();
      await orderService.deleteOrder(1);
      expect(orderRepository.delete).toHaveBeenCalledWith(1);
    });

    it('throws an error as order is not found', async () => {
      orderRepository.delete.mockRejectedValue({ affected: 0 });
      const action = async () => {
        await orderService.deleteOrder(5);
      };
      expect(action()).rejects.toEqual({ affected: 0 });
    });
  });
});
