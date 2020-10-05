import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Summary.module.css';
import deleteIcon from '../../assets/ingredients/delete.png';
import { numberWithDots } from '../../shared/utility';

const Summary = (props) => {
  const { items, basket, grandTotal } = props;

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
        <li className={classes.MinContainer}>
          <p>{item.quantity} darab</p>
          <img className={classes.DeleteIcon} src={deleteIcon} alt="Törlés" onClick={() => props.onClickedDelete(item.id)} />
        </li>
      </ul>
    ));

    let grandTotalItem = (
      <ul key={grandTotal} className={classes.Summary}>
        <li>
          <b>ÖSSZESEN:</b>
        </li>
        <li></li>
        <li className={classes.MinContainer}>
          <b>{numberWithDots(grandTotal)}</b>
          <b>&nbsp;RSD</b>
        </li>
      </ul>
    );

    summary = [summary, grandTotalItem];
  }

  return summary;
};

const mapStateToProps = (state) => {
  return {
    items: state.ordersReducer.items,
    basket: state.ordersReducer.basket,
    grandTotal: state.ordersReducer.grandTotal,
  };
};

export default connect(mapStateToProps)(Summary);
