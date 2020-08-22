import {
  IsEmail,
  IsNotEmpty,
  IsPositive,
  IsArray,
  IsObject,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Max,
} from 'class-validator';

export enum Country {
  HUNGARY = 'HUNGARY',
  SERBIA = 'SERBIA',
}

export enum Delivery {
  SHIPPING = 'SHIPPING',
  PICK_UP = 'PICK_UP',
}

export interface Address {
  street: string;
  settlement: string;
  postalCode: number;
  country: Country;
}

export class OrderDto {
  @IsOptional()
  @IsNotEmpty()
  id: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  name: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  phone: string;

  @IsEmail()
  @MinLength(3)
  @MaxLength(40)
  email: string;

  @IsObject()
  address: Address;

  @IsPositive()
  @Max(100000)
  price: number;

  @IsEnum(Delivery)
  delivery: Delivery;

  @IsArray()
  items: number[];
}

export class GetOrdersFilterDto {
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  name?: string;

  @IsOptional()
  @IsEmail()
  @MinLength(3)
  @MaxLength(40)
  email?: string;
}
