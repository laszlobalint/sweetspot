import { EmailTemplate } from './email.dto';

const templateHun: EmailTemplate = {
  welcome: 'Üdvözöljük! Sikeresen rendelt a SweetSpot oldalán keresztül!',
  name: 'Név',
  phone: 'Telefon',
  email: 'E-mail',
  grandTotal: 'Végösszeg',
  date: 'Dátum',
  delivery: 'Átvétel',
  address: 'Lakcím',
  notes: 'Megjegyzés',
  site: 'SweetSpot Rendelés',
  blog: 'SweetSpot Blog',
  notification: 'Az e-mail üzenetet sweetspot.subotica@gmail.com címen keresztül kapta meg',
};

const templateSer: EmailTemplate = {
  welcome: 'Dobro došli! Uspešno ste poručili preko SweetSpot sajta!',
  name: 'Ime',
  phone: 'Telefon',
  email: 'Email',
  grandTotal: 'Zbir',
  date: 'Datum',
  delivery: 'Režim prijema',
  address: 'Adresa',
  notes: 'Beleške',
  site: 'SweetSpot Porudžbina',
  blog: 'SweetSpot Blog',
  notification: 'Email poruku ste dobili preko sweetspot.subotica@gmail.com adrese',
};

const templateEng: EmailTemplate = {
  welcome: 'Welcome! Successfully ordered on SweetSpot site!',
  name: 'Name',
  phone: 'Phone',
  email: 'Email',
  grandTotal: 'Grand Total',
  date: 'Date',
  delivery: 'Delivery mode',
  address: 'Address',
  notes: 'Notes',
  site: 'SweetSpot Ordering',
  blog: 'SweetSpot Blog',
  notification: 'Received email from sweetspot.subotica@gmail.com account',
};

export const getEmailTemplateTranslation = (language: string): EmailTemplate => {
  if (language === 'EN') return templateEng;
  if (language === 'SR') return templateSer;
  return templateHun;
};
