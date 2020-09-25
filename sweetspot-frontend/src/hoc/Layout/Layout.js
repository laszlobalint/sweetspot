import React from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliary/Auxiliary';

const Layout = (props) => {
  return (
    <Aux>
      <main>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Layout);
