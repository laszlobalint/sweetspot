import React from 'react';

import classes from './Layout.module.css';
import Aux from '../Auxiliary/Auxiliary';

const Layout = (props) => (
  <Aux>
    <main className={classes.Layout}>{props.children}</main>
  </Aux>
);

export default Layout;
