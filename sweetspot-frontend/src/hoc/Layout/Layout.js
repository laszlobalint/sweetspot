import React from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Aux from '../Auxiliary/Auxiliary';

const Layout = (props) => {
  return (
    <Aux>
      <main className={classes.Layout}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Layout);
