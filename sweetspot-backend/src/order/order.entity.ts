/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Delivery } from './order.dto';
import { Item } from '../item/item.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  price: number;

  @Column()
  delivery: Delivery;

  @OneToMany(
    _type => Item,
    items => items.order,
  )
  items: Item[];

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz' })
  createdDate: Date;
}
