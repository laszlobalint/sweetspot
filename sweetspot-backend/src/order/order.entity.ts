/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn } from 'typeorm';

import { Delivery } from './order.dto';
import { Item } from '../item/item.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  phone: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'text' })
  grandTotal: number;

  @Column({ type: 'text' })
  deliveryDate: string;

  @Column({
    type: 'enum',
    enum: Delivery,
    default: Delivery.SHIPPING,
  })
  delivery: Delivery;

  @Column({
    type: 'text',
    nullable: true,
  })
  notes: string;

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
