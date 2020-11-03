import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Admin.module.css';
import * as actions from '../../store/actions';
import NavigationLink from '../../components/UI/NavigationLink/NavigationLink';
import Orders from '../../components/Orders/Orders';
import Management from '../Management/Management';

const Admin = (props) => {
  const { onFetchOrdersAdmin } = props;

  useEffect(() => {
    onFetchOrdersAdmin();
  }, [onFetchOrdersAdmin]);

  return (
    <div className={classes.Admin}>
      <NavigationLink link={`${props.match.path}/orders`}>Rendelések</NavigationLink>
      <NavigationLink link={`${props.match.path}/management`}>Kínálat</NavigationLink>
      <Route path={`${props.match.path}/orders`} component={Orders} />
      <Route path={`${props.match.path}/management`} component={Management} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrdersAdmin: () => dispatch(actions.fetchOrdersAdmin()),
  };
};

export default connect(null, mapDispatchToProps)(Admin);
