import React from 'react';

import classes from './Order.module.css';
import Summary from '../../components/Summary/Summary';

const Order = (props) => {
  return (
    <div className={classes.Order}>
      <h2>Kosár tartalma - Rendelési összegző</h2>
      <Summary />
    </div>
  );
};

export default Order;
