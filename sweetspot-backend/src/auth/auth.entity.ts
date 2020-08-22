import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', width: 100 })
  username: string;

  @Column({ type: 'varchar', width: 100 })
  password: string;

  @Column({ type: 'varchar', width: 50 })
  salt: string;

  async validateUserPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
