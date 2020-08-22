/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';

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

  @Column({ type: 'boolean' })
  allergens: boolean;

  @ManyToMany(
    _type => Ingredient,
    ingredient => ingredient.items,
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
