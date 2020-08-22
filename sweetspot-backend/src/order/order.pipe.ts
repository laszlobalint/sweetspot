import { PipeTransform, BadRequestException } from '@nestjs/common';

import { Country, Delivery, OrderDto } from './order.dto';

export class OrderValidationPipe implements PipeTransform {
  private readonly ALLOWED_COUNTRIES = Object.keys(Country);
  private readonly ALLOWED_DELIVERIES = Object.keys(Delivery);

  public transform(value: OrderDto): OrderDto {
    if (this.ALLOWED_COUNTRIES.indexOf(value.address.country) !== -1 && this.ALLOWED_DELIVERIES.indexOf(value.delivery) !== -1) {
      return value;
    } else {
      throw new BadRequestException(`Country and delivery method have to be enums.`);
    }
  }
}
