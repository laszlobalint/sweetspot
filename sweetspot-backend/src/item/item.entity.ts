/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';

import { Order } from '../order/order.entity';
import { Ingredient } from '../ingredient/ingredient.entity';

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  picture: string;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'boolean' })
  glutenfree: boolean;

  @Column({ type: 'boolean' })
  sugarfree: boolean;

  @Column({ type: 'boolean' })
  lactosefree: boolean;

  @ManyToMany(
    _type => Ingredient,
    ingredient => ingredient.items,
    {
      cascade: false,
    },
  )
  ingredients: Ingredient[];

  @ManyToOne(
    _type => Order,
    order => order.items,
    { eager: false },
  )
  orders: Order[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updateDate: Date;

  constructor(partial: Partial<Item>) {
    super();
    Object.assign(this, partial);
  }
}
