import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import PropTypes from 'prop-types';

import classes from './Item.module.css';
import gluten from '../../assets/ingredients/gluten.png';
import glutenfree from '../../assets/ingredients/glutenfree.png';
import sugar from '../../assets/ingredients/sugar.png';
import sugarfree from '../../assets/ingredients/sugarfree.png';
import lactose from '../../assets/ingredients/lactose.png';
import lactosefree from '../../assets/ingredients/lactosefree.png';
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
    toastr.info('Rendelés', 'Termék a kosárhoz adva.', { timeOut: 1500 });
  };

  return (
    <div className={classes.Item}>
      <div>
        <img className={classes.Image} src={props.picture} alt={props.title} />
        <div className={classes.Content}>
          <div className={classes.Text}>{props.title}</div>
        </div>
        <div className={classes.ImagePrice}>{numberWithDots(props.price)} RSD</div>
      </div>
      <div>
        <div className={classes.Title}>{props.title}</div>
        <div className={classes.Description}>{props.description}</div>
        <div className={classes.Price}>{numberWithDots(props.price)} RSD</div>
        <div className={classes.Icons}>
          {props.glutenfree ? (
            <img src={glutenfree} alt="Gluténmentes" title="Gluténmentes" />
          ) : (
            <img src={gluten} alt="Glutént tartalmaz" title="Glutént tartalmaz" />
          )}
          {props.sugarfree ? (
            <img src={sugarfree} alt="Cukormentes" title="Cukormentes" />
          ) : (
            <img src={sugar} alt="Cukrot tartalmaz" title="Cukrot tartalmaz" />
          )}
          {props.lactosefree ? (
            <img src={lactosefree} alt="Laktózmentes" title="Laktózmentes" />
          ) : (
            <img src={lactose} alt="Laktózt tartalmaz" title="Laktózt tartalmaz" />
          )}
        </div>
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

Item.propTypes = {
  quantity: PropTypes.number.isRequired,
};

export default connect(null, mapDispatchToProps)(Item);
