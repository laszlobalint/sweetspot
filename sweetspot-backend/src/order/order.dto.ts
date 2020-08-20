import { IsEmail, IsNotEmpty, IsPositive, IsArray, IsObject, IsEnum, IsOptional } from 'class-validator';
import { ItemDto } from '../item/item.dto';

export enum Country {
  HUNGARY = 'HUNGARY',
  SERBIA = 'SERBIA',
}

export enum Delivery {
  SHIPPING = 'SHIPPING',
  PICK_UP = 'PICK_UP',
}

export class CreateOrderDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  phone: string;
  @IsEmail()
  email: string;
  @IsObject()
  address: Address;
  @IsPositive()
  price: number;
  @IsEnum(Delivery)
  delivery: Delivery;
  @IsArray()
  items: ItemDto[];
}

export class UpdateOrderDto extends CreateOrderDto {}

export class GetOrderDto extends CreateOrderDto {
  @IsOptional()
  @IsNotEmpty()
  id: string;
}

export class GetOrdersFilterDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;
  @IsOptional()
  @IsEmail()
  email?: string;
}

export interface Address {
  street: string;
  settlement: string;
  postalCode: number;
  country: Country;
}
