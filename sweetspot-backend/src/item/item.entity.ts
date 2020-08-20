/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Order } from '../order/order.entity';

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  picture: string;

  @Column()
  glutenfree: boolean;

  @Column()
  sugarfree: boolean;

  //   @Column()
  //   ingredients: string[];

  //   @Column()
  //   allergens: string[];

  @Exclude()
  @ManyToOne(
    _type => Order,
    order => order.items,
  )
  order: Order;
}
