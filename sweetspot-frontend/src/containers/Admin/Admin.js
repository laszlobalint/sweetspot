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

const Admin = ({ match, onFetchOrdersAdmin }) => {
  const { t } = useTranslation();

  useEffect(() => {
    onFetchOrdersAdmin();
  }, [onFetchOrdersAdmin]);

  return (
    <div className={classes.Admin}>
      <NavigationLink link={`${match.path}/orders`}>{t('orders')}</NavigationLink>
      <NavigationLink link={`${match.path}/upload`}>{t('upload')}</NavigationLink>
      <NavigationLink link={`${match.path}/management`}>{t('management')}</NavigationLink>
      <Route path={`${match.path}/orders`} component={Orders} />
      <Route path={`${match.path}/upload`} component={Upload} />
      <Route path={`${match.path}/management`} component={Offers} />
      <Route path={`${match.path}/management/edit`} render={(props) => <Management {...props} />} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrdersAdmin: () => dispatch(actions.fetchOrdersAdmin()),
  };
};

export default connect(null, mapDispatchToProps)(Admin);
