import React from 'react';
import { connect } from 'react-redux';

import classes from './Order.module.css';
import * as actions from '../../store/actions';
import Summary from '../../components/Summary/Summary';

const Order = (props) => {
  return (
    <div className={classes.Order}>
      <h2>Kosár tartalma - Rendelési összegző</h2>
      <Summary onClickedDelete={(id) => props.onRemoveOrderItems(id)} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveOrderItems: (id) => dispatch(actions.removeOrderItems(id)),
  };
};

export default connect(null, mapDispatchToProps)(Order);
