/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne } from 'typeorm';

import { Item } from '../item/item.entity';

@Entity()
@Unique(['name'])
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', width: 200 })
  name: string;

  @ManyToOne(
    _type => Item,
    item => item.ingredients,
    { eager: false },
  )
  item: Item;
}
