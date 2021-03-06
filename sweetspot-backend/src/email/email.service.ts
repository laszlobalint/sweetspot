import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { Order } from '../order/order.entity';
import { getEmailTemplateTranslation } from './email.translations';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, order: Order): Promise<Order> {
    return this.mailerService
      .sendMail({
        to,
        subject: 'SweetSpot | ❤',
        html: this.getHtml(order),
      })
      .then(() => order)
      .catch(error => {
        throw new ServiceUnavailableException(error);
      });
  }

  private getHtml(order: Order): string {
    const { name, phone, email, address, grandTotal, deliveryDate, delivery, notes, language } = order;
    const t = getEmailTemplateTranslation(language);

    return `<table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tbody>
      <tr>
        <td width="100%">
          <div style="max-width: 1200px; margin: 0 auto">
            <table
              align="center"
              cellpadding="0"
              cellspacing="0"
              style="
                  border-spacing: 0;
                  font-family: gt-eesti, ArialMT, Helvetica, Arial, sans-serif;
                  margin: 0 auto;
                  padding: 24px;
                  width: 100%;
                  max-width: 1100px;
                "
            >
              <tbody>
                <tr>
                  <td>
                    <table style="margin-bottom: 20px; width: 100%">
                      <tbody>
                        <tr>
                          <td>
                            <a href="https://sweetspot.rs/" style="font-family: Helvetica, Arial, sans-serif; color: #0086bf" target="_blank">
                              <img
                                src="https://sweetspot.rs/sites/all/themes/ss/images/logo.png"
                                style="display: block; margin: auto"
                                alt="SweetSpot"
                                width="150"
                                height="150"
                              />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: justify; word-break: break-word">
                    <table style="margin-bottom: 20px; width: 100%">
                      <tbody>
                        <tr>
                          <td>
                            <table style="width: 100%; margin-bottom: 20px" width="100%" cellpadding="0" cellspacing="0">
                              <tbody>
                                <tr>
                                  <td style="text-align: center; vertical-align: middle">
                                    <strong style="font-family: Helvetica, Arial, sans-serif; color: #234567"></strong>
                                    <h1 style="font-size: 26px; line-height: 30px; color: #054752; word-break: normal">
                                      ${t.welcome}
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
                                style="background-color: #fff; margin-bottom: 20px; table-layout: fixed"
                                align="center"
                                width=""
                                cellspacing="0"
                                cellpadding="0"
                              >
                                <tbody>
                                  <tr
                                    style="
                                        background-color: #00aff5;
                                        color: #fff;
                                        text-align: center;
                                        border-radius: 48px;
                                        padding: 16px 24px;
                                        border-color: transparent;
                                        font-weight: bold;
                                        font-size: 16px;
                                        line-height: 1.5;
                                      "
                                  >
                                    <th width="180px">${t.name}</th>
                                    <th width="120px">${t.phone}</th>
                                    <th width="210px">${t.email}</th>
                                    <th width="110px">${t.grandTotal}</th>
                                    <th width="120px">${t.date}</th>
                                    <th width="120px">${t.delivery}</th>
                                  </tr>
                                  <tr
                                    style="
                                        text-align: center;
                                        line-height: 4;"
                                  >
                                    <td>${name}</td>
                                    <td>${phone}</td>
                                    <td>${email}</td>
                                    <td>${this.formatGrandTotal(grandTotal)}</td>
                                    <td>${this.formatDate(deliveryDate, language)}</td>
                                    <td>${this.formatDelivery(delivery, language)}</td>
                                  </tr>
                                  <tr
                                    style="
                                        background-color: #00aff5;
                                        color: #fff;
                                        text-align: center;
                                        border-radius: 48px;
                                        padding: 16px 24px;
                                        border-color: transparent;
                                        font-weight: bold;
                                        font-size: 16px;
                                        line-height: 1.5;
                                      "
                                  >
                                    <th colspan="3">${t.address}</th>
                                    <th colspan="3">${t.notes}</th>
                                  </tr>
                                  <tr style="line-height: 4; text-align: center;">
                                    <td colspan="3">${this.formatAddress(address)}</td>
                                    <td colspan="3">${notes}</td>
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
                    <table width="100%" style="margin-bottom: 20px; width: 100%">
                      <tbody>
                        <tr>
                          <td width="100%">
                            <div style="width: 100%; height: 1px; background-color: #ddd" color="#DDD" width="100%"></div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center">
                    <img
                      src="https://sweetspot.rs/sites/all/themes/ss/images/logo.png"
                      alt="SweetSpot"
                      style="display: block; width: 29px; height: auto; margin-left: auto; margin-right: auto; margin-bottom: 10px"
                      height="auto"
                    />
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center; font-size: 13px">
                    <a href="#" style="color: #00aff5" target="_blank"> ${t.site} </a>
                    <span style="color: #00aff5">|</span>
                    <a href="https://sweetspot.rs/" style="color: #00aff5" target="_blank"> ${t.blog} </a>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center">
                    <table
                      style="max-width: 100%; width: 100%; text-align: center; font-family: ArialMT, Arial, sans-serif"
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tbody>
                        <tr>
                          <td style="text-align: center">
                            <p style="font-size: 10px; color: #708c91; text-align: center; padding: 0; margin-top: 10px; margin-bottom: 2px">
                            ${t.notification}
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

  formatDate = (dateString: string, language: string): string => {
    if (language === 'SR')
      return new Date(dateString).toLocaleDateString('sr-Latn-RS', { year: 'numeric', month: '2-digit', day: '2-digit' });

    if (language === 'EN') return new Date(dateString).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });

    return new Date(dateString).toLocaleDateString('hu-HU', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  formatAddress = (address: string): string => address.split(';')[0].replace('null ,', '');

  formatDelivery = (delivery: string, language: string): string => {
    if (language === 'SR') {
      if (delivery === 'SHIPPING') return 'Kućna dostava';
      else return 'Lično preuzimanje';
    }

    if (language === 'EN') {
      if (delivery === 'SHIPPING') return 'Home delivery';
      else return 'Personal collection (pick up)"';
    }

    if (delivery === 'SHIPPING') return 'Házhozszállítás';
    else return 'Személyes átvétel';
  };

  formatGrandTotal = (number: number): string => `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')},00 RSD`;
}
