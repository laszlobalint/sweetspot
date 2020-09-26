import React from 'react';

import classes from './Header.module.css';
import facebookLogo from '../../assets/logos/facebook.png';
import instagramLogo from '../../assets/logos/instagram.png';
import twitterLogo from '../../assets/logos/twitter.png';
import whatsappLogo from '../../assets/logos/whatsapp.png';

const Header = (props) => {
  return (
    <header>
      <div className={classes.Header}>
        <ul>
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
        <ul>
          <li>
            <a href="/">Rendelés</a>
          </li>
          <li>
            <a href="/">Kínálat</a>
          </li>
          <li>
            <a href="https://sweetspot.rs/">Blog</a>
          </li>
          <li>
            <a href="/">Kapcsolat</a>
          </li>
        </ul>
      </div>
      <p className={classes.Title}>Édes Pihenő - Leszállópálya az Édesszájúak bolygóján</p>
    </header>
  );
};

export default Header;
