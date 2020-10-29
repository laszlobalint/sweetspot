import React from 'react';
import { toastr } from 'react-redux-toastr';

import classes from './Header.module.css';
import navClasses from '../UI/NavigationLink/NavigationLink.module.css';
import { numberWithDots } from '../../shared/utility';
import NavigationLink from '../UI/NavigationLink/NavigationLink';
import basketLogo from '../../assets/logos/basket.png';
import { socialLogos } from './Header.logos';

const Header = (props) => (
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
      <ul className={classes.Navigation}>
        {
          <NavigationLink link="/order" disabled={props.grandTotal === 0}>
            Rendelés
          </NavigationLink>
        }
        {
          <NavigationLink link="/offers" exact>
            Kínálat
          </NavigationLink>
        }
        <li className={navClasses.NavigationLink}>
          <a
            href="#top"
            onClick={() =>
              toastr.info(
                'RENDELÉS MENETE',
                'Tegye a termékeket a kosárba (a megadott mennyiségben), majd kattinton a fenti "Rendelés" menüpontra a folytatáshoz. Kellemes válogatást!',
              )
            }
          >
            Infók
          </a>
        </li>
        <NavigationLink link="/contact" exact>
          Kapcsolat
        </NavigationLink>
        {!props.authenticated ? (
          <NavigationLink link="/auth" exact>
            Admin
          </NavigationLink>
        ) : (
          [
            <NavigationLink link="/admin" key="admin" exact>
              Admin
            </NavigationLink>,
            <NavigationLink link="/logout" key="logout">
              Kijelentkezés
            </NavigationLink>,
          ]
        )}
      </ul>
      <span className={[classes.GrandTotal]}>
        {<img src={basketLogo} alt={'Kosár tartalma'} />} Kosár: {numberWithDots(props.grandTotal)} RSD
      </span>
    </div>
    <p className={classes.Title}>Édes Pihenő - Leszállópálya az Édesszájúak bolygóján</p>
  </header>
);

export default Header;
