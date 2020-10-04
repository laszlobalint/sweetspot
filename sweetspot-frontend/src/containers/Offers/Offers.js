import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './Offers.module.css';
import axios from '../../client/axios-client';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import Item from '../../components/Item/Item';

const Offers = React.memo((props) => {
  const { items, loading, onFetchOrderItems } = props;

  useEffect(() => {
    onFetchOrderItems();
  }, [onFetchOrderItems]);

  let fetchedItems = <Spinner />;

  if (!loading && items.length > 0) {
    fetchedItems = items.map((item) => (
      <Item
        key={item.id}
        id={item.id}
        title={item.title}
        description={item.description}
        price={item.price}
        glutenfree={item.glutenfree}
        sugarfree={item.sugarfree}
        lactosefree={item.lactosefree}
        picture={item.picture}
      />
    ));
  }

  return <article className={classes.Offers}>{fetchedItems}</article>;
});

const mapStateToProps = (state) => {
  return {
    items: state.ordersReducer.items,
    error: state.ordersReducer.error,
    loading: state.ordersReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrderItems: () => dispatch(actions.fetchOrderItems()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Offers, axios);
