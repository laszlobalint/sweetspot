import React from 'react';

import classes from './Footer.module.css';
import logo from '../../assets/logos/sweetspot.png';

const Footer = (props) => {
  return (
    <footer className={classes.Footer}>
      <div>KAPCSOLAT</div>
      <img src={logo} alt="SweetSpot logo" />
      <div>MŰHELY</div>
    </footer>
  );
};

export default Footer;
