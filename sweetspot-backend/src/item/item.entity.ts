/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Order } from '../order/order.entity';

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', width: 200 })
  title: string;

  @Column({ type: 'varchar', width: 200 })
  picture: string;

  @Column({ type: 'boolean' })
  glutenfree: boolean;

  @Column({ type: 'boolean' })
  sugarfree: boolean;

  @Column({ type: 'simple-array' })
  ingredients: string[];

  @Column({ type: 'simple-array' })
  allergens: string[];

  @Exclude()
  @ManyToOne(
    _type => Order,
    order => order.items,
    { eager: false },
  )
  order: Order;

  @Column({ type: 'number', width: 200 })
  orderId: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdDate: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz' })
  updateDate: Date;
}
