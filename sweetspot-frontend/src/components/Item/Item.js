import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Item.module.css';
import * as actions from '../../store/actions';
import { numberWithDots } from '../../shared/utility';
import Button from '../UI/Button/Button';
import Number from '../UI/Number/Number';

const Item = (props) => {
  const [quantity, setQuantity] = useState(1);

  const onIncreasedHandler = () => {
    if (quantity < 100) setQuantity(quantity + 1);
  };

  const onDecreasedHandler = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const onAddedOrderItemsHandler = () => {
    props.onAddedItems(props.id, props.price, quantity);
  };

  return (
    <div className={classes.Item}>
      <div>
        <img src={props.picture} alt={props.title} />
        <div className={classes.Content}>
          <div className={classes.Text}>{props.title}</div>
        </div>
      </div>
      <div>
        <div className={classes.Title}>{props.title}</div>
        <div>{props.description}</div>
        <div>{numberWithDots(props.price)} RSD</div>
        <div>{props.glutenfree ? 'Gluténmentes' : 'Glutént tartalmaz'}</div>
        <div>{props.sugarfree ? 'Cukormentes' : 'Cukrot tartalmaz'}</div>
        <div>{props.allergens ? 'Allergéneket tartalmaz' : 'Allergénmentes'}</div>
        <div className={classes.Navigation}>
          <Button onClick={onAddedOrderItemsHandler}>Kosárba</Button>
          <Number onClickedMore={onIncreasedHandler} onClickedLess={onDecreasedHandler} value={quantity} onChanged={() => {}} />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddedItems: (id, price, quantity) => dispatch(actions.addOrderItems(id, price, quantity)),
  };
};

export default connect(null, mapDispatchToProps)(Item);
