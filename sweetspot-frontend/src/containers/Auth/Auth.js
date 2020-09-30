import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classes from './Auth.module.css';
import * as actions from '../../store/actions';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import { formControls } from './Auth.input';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = (props) => {
  const [controls, setControls] = useState(formControls);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, controls[controlName].validation),
        touched: true,
      }),
    });
    setControls(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuthenticate(controls.username.value, controls.password.value);
  };

  const formElements = [];
  for (let key in controls) formElements.push({ id: key, config: controls[key] });
  let form = [
    formElements.map((element) => (
      <Input
        key={element.id}
        elementType={element.config.elementType}
        elementConfig={element.config.elementConfig}
        value={element.config.value}
        label={element.config.label}
        invalid={!element.config.valid}
        validate={element.config.validation}
        touched={element.config.touched}
        changed={(event) => inputChangedHandler(event, element.id)}
      />
    )),
    <Button key="loginButton">Bejelentkezés</Button>,
  ];

  if (props.loading) form = <Spinner />;

  let error = null;
  if (props.error) error = <p className={classes.Error}>{props.error}</p>;

  let redirect = null;
  if (props.authenticated) redirect = <Redirect to="/" />;

  return (
    <article className={classes.Auth}>
      {redirect}
      {error}
      <form onSubmit={submitHandler}>{form}</form>
    </article>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.authReducer.token,
    error: state.authReducer.error,
    loading: state.authReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticate: (username, password) => dispatch(actions.authenticate(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
