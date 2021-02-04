import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { useTranslation } from 'react-i18next';

import classes from './Order.module.css';
import * as actions from '../../store/actions';
import Button from '../../components/UI/Button/Button';
import Summary from '../../components/Summary/Summary';
import Form from './Form/Form';

const Order = ({ match, history, onRemoveOrderItems }) => {
  const { t } = useTranslation();

  const removeOrderItemsHandler = (id) => {
    onRemoveOrderItems(id);
    toastr.info(t('ordering'), t('basket-delete'), { timeOut: 1500 });
  };

  const onCancelledHandler = () => {
    history.push('/');
  };

  const onContinuedHandler = () => {
    history.replace(`${match.path}/form`);
  };

  return (
    <div className={classes.Order}>
      <h2>{t('basket-summary')}</h2>
      <Summary onClickedDelete={(id) => removeOrderItemsHandler(id)} />
      {history.location.pathname === '/order' && (
        <div className={classes.Buttons}>
          <Button type="button" onClick={onCancelledHandler}>
            {t('cancel')}
          </Button>
          <Button type="button" onClick={onContinuedHandler}>
            {t('continue')}
          </Button>
        </div>
      )}
      <Route path={`${match.path}/form`} component={Form} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveOrderItems: (id) => dispatch(actions.removeOrderItems(id)),
  };
};

export default connect(null, mapDispatchToProps)(Order);
