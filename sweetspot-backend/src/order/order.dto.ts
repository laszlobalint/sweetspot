import { ItemDto } from '../item/item.dto';

export class CreateOrderDto {
  name: string;
  phone: string;
  email: string;
  address: Address;
  price: number;
  delivery: Delivery;
  items: ItemDto[];
}

export class UpdateOrderDto extends CreateOrderDto {}

export class GetOrderDto extends CreateOrderDto {
  id?: string;
}

export class GetOrdersFilterDto {
  name: string;
  email: string;
}

export interface Address {
  street: string;
  settlement: string;
  postalCode: number;
  country: Country;
}

export enum Country {
  HUNGARY = 'Magyarország',
  SERBIA = 'Serbia',
}

export enum Delivery {
  SHIPPING = 'Kiszállítás',
  PICK_UP = 'Személyes átvétel',
}
