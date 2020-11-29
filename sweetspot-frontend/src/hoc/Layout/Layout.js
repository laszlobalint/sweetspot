import React from 'react';

import classes from './Layout.module.css';

const Layout = (props) => <main className={classes.Layout}>{props.children}</main>;

export default Layout;
