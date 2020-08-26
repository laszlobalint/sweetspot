import { Injectable, BadRequestException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { Order } from '../order/order.entity';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, order: Order): Promise<Order> {
    return this.mailerService
      .sendMail({
        to,
        subject: 'Sikeres rendelés a SweetSpot oldalon - Összegző',
        html: this.getHtml(order),
      })
      .then(() => {
        return order;
      })
      .catch(error => {
        console.log(error);
        throw new BadRequestException('Could not send the confirmation email!');
      });
  }

  private getHtml(order: Order): string {
    const { name, phone, email, address, grandTotal, deliveryDate, delivery, notes } = order;
    return `<table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tbody>
      <tr>
        <td width="100%">
          <div style="max-width:600px;margin:0 auto">
            <table
              align="center"
              cellpadding="0"
              cellspacing="0"
              style="border-spacing:0;font-family:gt-eesti,ArialMT,Helvetica,Arial,sans-serif;Margin:0 auto;padding:24px;width:100%;max-width:500px"
            >
              <tbody>
                <tr>
                  <td>
                    <table style="margin-bottom:40px;width:100%" width="100%">
                      <tbody>
                        <tr>
                          <td>
                            <a href="https://sweetspot.rs/" style="font-family:Helvetica,Arial,sans-serif;color:#0086bf" target="_blank">
                              <img src="https://sweetspot.rs/sites/all/themes/ss/images/logo.png" style="display:block" alt="SweetSpot" width="200" height="200" />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:justify;word-break:break-word">
                    <table style="margin-bottom:20px;width:100%" width="100%">
                      <tbody>
                        <tr>
                          <td>
                            <table style="width:100%;margin-bottom:20px" width="100%" cellpadding="0" cellspacing="0">
                              <tbody>
                                <tr>
                                  <td>
                                    <strong style="font-family:Helvetica,Arial,sans-serif;color:#234567"></strong>
  
                                    <h1 style="font-size:26px;line-height:30px;color:#054752;word-break:normal">
                                      Üdvözöljük! Sikeresen rendelt a SweetSpot oldalán keresztül!
                                    </h1>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <center>
                              <table
                                style="background-color:#fff;margin-bottom:20px;table-layout:fixed"
                                align="center"
                                width=""
                                cellspacing="0"
                                cellpadding="0"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      style="background-color:#00aff5;color:#fff;text-align:center;border-radius:48px;padding:16px 24px;border-color:transparent;font-weight:bold;font-size:16px;line-height:1"
                                    ></td>
                                    <td>Név: ${name}></td>
                                    <td>Telefon: ${phone}</td>
                                    <td>E-mail: ${email}</td>
                                    <td>Cím: ${address}</td>
                                    <td>Végösszeg: ${grandTotal} dinár</td>
                                    <td>Kézbesítési nap: ${deliveryDate}</td>
                                    <td>Kézbesítési forma: ${delivery}</td>
                                    <td>Megjegyzés: ${notes}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </center>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <table width="100%" style="margin-bottom:20px;width:100%">
                      <tbody>
                        <tr>
                          <td width="100%">
                            <div style="width:100%;height:1px;background-color:#ddd" color="#DDD" width="100%"></div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center">
                    <img
                      src="https://sweetspot.rs/sites/all/themes/ss/images/logo.png"
                      alt="SweetSpot"
                      style="display:block;width:29px;height:auto;margin-left:auto;margin-right:auto;margin-bottom:10px"
                      height="auto"
                    />
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;font-size:13px">
                    <a href="#" style="color:#00aff5" target="_blank">
                      SweetSpot Rendelés
                    </a>
                    <span style="color:#00aff5">|</span>
                    <a href="https://sweetspot.rs/" style="color:#00aff5" target="_blank">
                      SweetSpot Blog
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center">
                    <table
                      style="max-width:100%;width:100%;text-align:center;font-family:ArialMT,Arial,sans-serif"
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tbody>
                        <tr>
                          <td style="text-align:center">
                            <p style="font-size:10px;color:#708c91;text-align:center;padding:0;margin-top:10px;margin-bottom:2px">
                              Az e-mail üzenetet sweetspot.subotica@gmail.com címen keresztül kapta meg
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  `;
  }
}