import React from 'react';
import { toastr } from 'react-redux-toastr';
import { useTranslation } from 'react-i18next';

import classes from './Header.module.css';
import navClasses from '../UI/NavigationLink/NavigationLink.module.css';
import basketLogo from '../../assets/logos/basket.png';
import { socialLogos } from './Header.logos';
import { numberWithDots } from '../../shared/utility';
import NavigationLink from '../UI/NavigationLink/NavigationLink';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

const Header = (props) => {
  const { t } = useTranslation();

  return (
    <header id="top">
      <div className={classes.Header}>
        <ul className={classes.Logos}>
          {socialLogos.map((logo) => (
            <li key={logo.alt}>
              <a href={logo.href} target="_blank" rel="noopener noreferrer">
                {<img src={logo.src} alt={logo.alt} />}
              </a>
            </li>
          ))}
        </ul>
        <LanguageSelector />
        <ul className={classes.Navigation}>
          {
            <NavigationLink link="/order" disabled={props.grandTotal === 0}>
              {t('ordering')}
            </NavigationLink>
          }
          {
            <NavigationLink link="/offers" exact>
              {t('offers')}
            </NavigationLink>
          }
          <li className={navClasses.NavigationLink}>
            <a href="#top" onClick={() => toastr.info(t('order-steps'), t('order-steps-details'))}>
              {t('infos')}
            </a>
          </li>
          <NavigationLink link="/contact" exact>
            {t('contact')}
          </NavigationLink>
          {!props.authenticated ? (
            <NavigationLink link="/auth" exact>
              {t('admin')}
            </NavigationLink>
          ) : (
            [
              <NavigationLink link="/admin" key="admin" exact>
                {t('admin')}
              </NavigationLink>,
              <NavigationLink link="/logout" key="logout">
                {t('logout')}
              </NavigationLink>,
            ]
          )}
        </ul>
        <span className={[classes.GrandTotal]}>
          {<img src={basketLogo} alt={t('basket-content')} />} {t('basket')}: {numberWithDots(props.grandTotal)} {t('currency')}
        </span>
      </div>
      <p className={classes.Title}>{t('slogan')}</p>
    </header>
  );
};

export default Header;
