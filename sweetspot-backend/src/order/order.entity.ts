/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn } from 'typeorm';

import { Delivery } from './order.dto';
import { Item } from '../item/item.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', width: 100 })
  name: string;

  @Column({ type: 'varchar', width: 100 })
  phone: string;

  @Column({ type: 'varchar', width: 100 })
  email: string;

  @Column({ type: 'varchar', width: 200 })
  address: string;

  @Column({ type: 'int', width: 100 })
  price: number;

  @Column({
    type: 'enum',
    enum: Delivery,
    default: Delivery.SHIPPING,
  })
  delivery: Delivery;

  @OneToMany(
    _type => Item,
    item => item.orders,
    { eager: true },
  )
  items: Item[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updateDate: Date;

  constructor(partial: Partial<Order>) {
    super();
    Object.assign(this, partial);
  }
}
