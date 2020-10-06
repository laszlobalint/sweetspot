import React from 'react';

import classes from './Footer.module.css';
import logo from '../../assets/logos/sweetspot.png';

const Footer = (props) => (
  <footer className={classes.Footer}>
    <ul>
      <li>KAPCSOLAT</li>
      <li>24000 Szabadka, Radnóti Miklós utca 37.</li>
      <li>Telefon: +381 63 769 3041</li>
      <li>E-mail: sweetspot.subotica@gmail.com</li>
      <li>Blog: https://sweetspot.rs/</li>
    </ul>
    <img src={logo} alt="SweetSpot logo" />
    <ul>
      <li>MŰHELY</li>
      <li>A műhely nem rendelkezik állandó nyitvatartási idővel.</li>
      <li>Nincsenek mindennapos kínálatok, csak időszakosak.</li>
      <li>A süteményeket csak elvitelre lehet megvásárolni.</li>
      <li>A rendeléseket kiszállítással vagy személyes átvétellel intézzük.</li>
    </ul>
  </footer>
);

export default Footer;
