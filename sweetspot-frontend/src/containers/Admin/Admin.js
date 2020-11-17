import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import classes from './Admin.module.css';
import * as actions from '../../store/actions';
import NavigationLink from '../../components/UI/NavigationLink/NavigationLink';
import Orders from '../../components/Orders/Orders';
import Upload from '../Upload/Upload';
import Offers from '../Offers/Offers';
import Management from '../Management/Management';

const Admin = (props) => {
  const { onFetchOrdersAdmin } = props;

  const { t } = useTranslation();

  useEffect(() => {
    onFetchOrdersAdmin();
  }, [onFetchOrdersAdmin]);

  return (
    <div className={classes.Admin}>
      <NavigationLink link={`${props.match.path}/orders`}>{t('orders')}</NavigationLink>
      <NavigationLink link={`${props.match.path}/upload`}>{t('upload')}</NavigationLink>
      <NavigationLink link={`${props.match.path}/management`}>{t('management')}</NavigationLink>
      <Route path={`${props.match.path}/orders`} component={Orders} />
      <Route path={`${props.match.path}/upload`} component={Upload} />
      <Route path={`${props.match.path}/management`} component={Offers} />
      <Route path={`${props.match.path}/management/edit`} render={(props) => <Management {...props} />} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrdersAdmin: () => dispatch(actions.fetchOrdersAdmin()),
  };
};

export default connect(null, mapDispatchToProps)(Admin);
