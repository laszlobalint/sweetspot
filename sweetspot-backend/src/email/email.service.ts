import { Injectable, BadRequestException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { Order } from '../order/order.entity';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, order?: Order): Promise<Order> {
    // const { name, phone, email, price, delivery, items } = order;
    return this.mailerService
      .sendMail({
        to,
        subject: 'Sikeres rendelés a SweetSpot oldalon - Összegző',
        template: `${__dirname}/email`,
        context: {
          name: 'to-do',
          phone: 'to-do',
          email: 'to-do',
          price: 'to-do',
          delivery: 'to-do',
          items: 'to-do',
        },
      })
      .then(() => {
        return order;
      })
      .catch(() => {
        throw new BadRequestException('Could not send the confirmation email!');
      });
  }
}
