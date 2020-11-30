/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToMany } from 'typeorm';

import { Delivery, Language } from './order.dto';
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

  @Column({ type: 'integer' })
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

  @ManyToMany(
    _type => Item,
    item => item.orders,
    {
      cascade: true,
    },
  )
  @JoinTable()
  items: Item[];

  @Column({
    type: 'enum',
    enum: Language,
    default: Language.HU,
  })
  language: Language;

  @CreateDateColumn({ type: 'timestamptz' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updateDate: Date;

  constructor(partial: Partial<Order>) {
    super();
    Object.assign(this, partial);
  }
}
