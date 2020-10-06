import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationLink.module.css';

const NavigationLink = (props) => (
  <li className={classes.NavigationLink}>
    <NavLink
      to={props.link}
      className={props.disabled ? classes.DisabledLink : classes.EnabledLink}
      activeClassName={classes.active}
      exact={props.exact}
    >
      {props.children}
    </NavLink>
  </li>
);

export default NavigationLink;
