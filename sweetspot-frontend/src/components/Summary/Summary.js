import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Summary.module.css';
import { numberWithDots } from '../../shared/utility';

const Summary = (props) => {
  const { items, basket } = props;

  const basketItems = [];
  basket.forEach((element) => {
    let item = items.find((i) => i.id === element.id);
    basketItems.push({ id: item.id, title: item.title, description: item.description, price: item.price, quantity: element.quantity });
  });

  let summary = <Redirect to="/offers" />;

  if (basketItems.length > 0) {
    summary = basketItems.map((item) => (
      <ul key={item.id} className={classes.Summary}>
        <li>
          <details>
            <summary>{item.title}</summary>
            {item.description}
          </details>
        </li>
        <li>{numberWithDots(item.price)} RSD</li>
        <li>{item.quantity} darab</li>
      </ul>
    ));
  }

  return summary;
};

const mapStateToProps = (state) => {
  return {
    items: state.ordersReducer.items,
    basket: state.ordersReducer.basket,
  };
};

export default connect(mapStateToProps)(Summary);
