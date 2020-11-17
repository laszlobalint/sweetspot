import React from 'react';
import { useTranslation } from 'react-i18next';

import classes from './Footer.module.css';
import logo from '../../assets/logos/sweetspot.png';

const Footer = (props) => {
  const { t } = useTranslation();

  return (
    <footer className={classes.Footer}>
      <ul>
        <li className={classes.Upper}>{t('contact')}</li>
        <li>{t('address')}</li>
        <li>{t('phone')}</li>
        <li>{t('email')}</li>
        <li>{t('blog')}</li>
      </ul>
      <img src={logo} alt={t('app-title')} />
      <ul>
        <li className={classes.Upper}>{t('workshop')}</li>
        <li>{t('open-hours')}</li>
        <li>{t('offer-type')}</li>
        <li>{t('take-away')}</li>
        <li>{t('delivery-mode')}</li>
      </ul>
    </footer>
  );
};

export default Footer;
