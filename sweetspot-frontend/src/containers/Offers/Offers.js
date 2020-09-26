import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './Offers.module.css';
import axios from '../../client/axios-client';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Button/Spinner/Spinner';

const Offers = (props) => {
  const { onFetchOrderItems } = props;

  useEffect(() => {
    onFetchOrderItems();
  }, [onFetchOrderItems]);

  let orderItems = <Spinner />;
  if (!props.loading) orderItems = <div>ORDER ITEMS</div>;

  return <article className={classes.Offers}>{orderItems}</article>;
};

const mapStateToProps = (state) => {
  return {
    loading: state.ordersReducer.loading,
    error: state.ordersReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrderItems: () => dispatch(actions.fetchOrderItems()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Offers, axios);
