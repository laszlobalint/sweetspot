import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import classes from './Order.module.css';
import * as actions from '../../store/actions';
import Button from '../../components/UI/Button/Button';
import Summary from '../../components/Summary/Summary';
import Form from './Form/Form';

const Order = (props) => {
  const removeOrderItemsHandler = (id) => {
    props.onRemoveOrderItems(id);
    toastr.info('Rendelés', 'Termék törölve a kosárból.', { timeOut: 1500 });
  };

  const onCancelledHandler = () => {
    props.history.push('/');
  };

  const onContinuedHandler = () => {
    props.history.replace(`${props.match.path}/form`);
  };

  return (
    <div className={classes.Order}>
      <h2>Kosár tartalma - Rendelési összegző</h2>
      <Summary onClickedDelete={(id) => removeOrderItemsHandler(id)} />
      {props.history.location.pathname === '/order' && (
        <div className={classes.Buttons}>
          <Button onClick={onCancelledHandler}>Mégsem</Button>
          <Button onClick={onContinuedHandler}>Tovább</Button>
        </div>
      )}
      <Route path={`${props.match.path}/form`} component={Form} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveOrderItems: (id) => dispatch(actions.removeOrderItems(id)),
  };
};

export default connect(null, mapDispatchToProps)(Order);
