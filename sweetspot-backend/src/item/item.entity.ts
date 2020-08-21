/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { Order } from '../order/order.entity';
import { Ingredient } from '../ingredient/ingredient.entity';

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
  allergens: string[];

  @OneToMany(
    _type => Ingredient,
    ingredient => ingredient.item,
    { eager: true },
  )
  ingredients: Ingredient[];

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

  @UpdateDateColumn({ type: 'timestamptz' })
  updateDate: Date;
}
