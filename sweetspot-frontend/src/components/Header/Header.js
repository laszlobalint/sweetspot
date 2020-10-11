import React from 'react';

import classes from './Header.module.css';
import { numberWithDots } from '../../shared/utility';
import basketLogo from '../../assets/logos/basket.png';
import facebookLogo from '../../assets/logos/facebook.png';
import instagramLogo from '../../assets/logos/instagram.png';
import twitterLogo from '../../assets/logos/twitter.png';
import whatsappLogo from '../../assets/logos/whatsapp.png';
import NavigationLink from '../UI/NavigationLink/NavigationLink';

const Header = (props) => (
  <header>
    <div className={classes.Header}>
      <ul className={classes.Logos}>
        <li>
          <a href="https://www.facebook.com/sweetspot.lala/" target="_blank" rel="noopener noreferrer">
            {<img src={facebookLogo} alt="Facebook" />}
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/sweetspotlala/" target="_blank" rel="noopener noreferrer">
            {<img src={instagramLogo} alt="Instagram" />}
          </a>
        </li>
        <li>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            {<img src={twitterLogo} alt="Twitter" />}
          </a>
        </li>
        <li>
          <a href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer">
            {<img src={whatsappLogo} alt="Whatsapp" />}
          </a>
        </li>
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
        <NavigationLink link="https://sweetspot.rs/" exact>
          Blog
        </NavigationLink>
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
        {<img src={basketLogo} alt="Kosár" />} Kosár: {numberWithDots(props.grandTotal)} RSD
      </span>
    </div>
    <p className={classes.Title}>Édes Pihenő - Leszállópálya az Édesszájúak bolygóján</p>
  </header>
);

export default Header;
