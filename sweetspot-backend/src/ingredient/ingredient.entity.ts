/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

import { Item } from '../item/item.entity';

@Entity()
@Unique(['name'])
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', width: 200 })
  name: string;

  @ManyToMany(
    _type => Item,
    item => item.ingredients,
    {
      cascade: true,
    },
  )
  @JoinTable()
  items: Item[];

  constructor(partial: Partial<Ingredient>) {
    super();
    Object.assign(this, partial);
  }
}
