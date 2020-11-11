import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import PropTypes from 'prop-types';

import classes from './Item.module.css';
import * as actions from '../../store/actions';
import { ingredientsLogos } from './Item.logos';
import { numberWithDots } from '../../shared/utility';
import Button from '../UI/Button/Button';
import Number from '../UI/Number/Number';
import { Redirect } from 'react-router-dom';
import Aux from '../../hoc/Auxiliary/Auxiliary';

const Item = (props) => {
  const { id, title, description, picture, price, glutenfree, sugarfree, lactosefree, onAddedItems, authenticated, onSelectedItem } = props;

  const [quantity, setQuantity] = useState(1);
  const [isSelected, setIsSelected] = useState(false);

  const onIncreasedHandler = () => {
    if (quantity < 100) setQuantity(quantity + 1);
  };

  const onDecreasedHandler = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const onAddedOrderItemsHandler = () => {
    onAddedItems(id, price, quantity);
    toastr.info('Rendelés', 'Termék a kosárhoz adva.', { timeOut: 1500 });
  };

  const onItemSelectedHandler = () => {
    if (authenticated) {
      setIsSelected(true);
      onSelectedItem();
    }
  };

  return (
    <Aux>
      {isSelected && (
        <Redirect
          to={{ pathname: '/admin/management/edit', state: { id, title, description, picture, price, glutenfree, sugarfree, lactosefree } }}
        />
      )}
      <div className={classes.Item}>
        <div onClick={onItemSelectedHandler}>
          <img className={classes.Image} src={picture} alt={title} />
          <div className={classes.Content}>
            <div className={classes.Text}>{title}</div>
          </div>
          <div className={classes.ImagePrice}>{numberWithDots(price)} RSD</div>
        </div>
        <div>
          <div className={classes.Title}>{title}</div>
          <div className={classes.Description}>{description}</div>
          <div className={classes.Price}>{numberWithDots(price)} RSD</div>
          <div className={classes.Icons}>
            {glutenfree ? (
              <img
                src={ingredientsLogos.glutenfree.logo}
                alt={ingredientsLogos.glutenfree.title}
                title={ingredientsLogos.glutenfree.title}
              />
            ) : (
              <img src={ingredientsLogos.gluten.logo} alt={ingredientsLogos.gluten.title} title={ingredientsLogos.gluten.title} />
            )}
            {sugarfree ? (
              <img src={ingredientsLogos.sugarfree.logo} alt={ingredientsLogos.sugarfree.title} title={ingredientsLogos.sugarfree.title} />
            ) : (
              <img src={ingredientsLogos.sugar.logo} alt={ingredientsLogos.sugar.title} title={ingredientsLogos.sugar.title} />
            )}
            {lactosefree ? (
              <img
                src={ingredientsLogos.lactosefree.logo}
                alt={ingredientsLogos.lactosefree.title}
                title={ingredientsLogos.lactosefree.title}
              />
            ) : (
              <img src={ingredientsLogos.lactose.logo} alt={ingredientsLogos.lactose.title} title={ingredientsLogos.lactose.title} />
            )}
          </div>
          <div className={classes.Navigation}>
            <Button onClick={onAddedOrderItemsHandler}>Kosárba</Button>
            <Number onClickedMore={onIncreasedHandler} onClickedLess={onDecreasedHandler} value={quantity} onChanged={() => {}} />
          </div>
        </div>
      </div>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.authReducer.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddedItems: (id, price, quantity) => dispatch(actions.addOrderItems(id, price, quantity)),
  };
};

Item.propTypes = {
  quantity: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
