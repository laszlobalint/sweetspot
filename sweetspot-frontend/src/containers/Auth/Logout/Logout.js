import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import { useTranslation } from 'react-i18next';

import * as actions from '../../../store/actions';

const Logout = (props) => {
  const { onLogout } = props;

  const { t } = useTranslation();

  useEffect(() => {
    onLogout();
    toastr.success(t('logout-success'), t('come-back'));
  }, [onLogout, t]);

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.authenticateLogout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
