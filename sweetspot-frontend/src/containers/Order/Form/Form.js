import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import classes from './Form.module.css';
import * as actions from '../../../store/actions';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Calendar from '../../../components/UI/Calendar/Calendar';
import formControls from './Form.input';
import { updateObject, checkValidity } from '../../../shared/utility';

const Forms = (props) => {
  const { history, basket, grandTotal, error, loading, onSaveOrder } = props;

  const { t } = useTranslation();
  const [controls, setControls] = useState(formControls);
  const [date, setDate] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [country] = useState('SERBIA')[0];

  const checkoutCancelledHandler = () => {
    history.push('/order');
  };

  const checkoutContinuedHandler = (event) => {
    event.preventDefault();
    const order = {
      name: controls.name.value,
      phone: controls.phone.value,
      email: controls.email.value,
      address: {
        street: controls.street.value,
        settlement: controls.settlement.value,
        postalCode: parseInt(controls.postalCode.value),
        country,
      },
      grandTotal: +grandTotal,
      deliveryDate: date.toISOString(),
      delivery: controls.delivery.value,
      notes: controls.notes.value,
      items: createItemsFromBasket(),
    };

    onSaveOrder(order);
  };

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, controls[controlName].validation),
        touched: true,
      }),
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    formIsValid = date && formIsValid;

    setControls(updatedControls);
    setIsValid(formIsValid);
  };

  const createItemsFromBasket = () => {
    const orderItems = [];
    basket.forEach((item) => {
      if (item.quantity > 1) {
        for (let i = 0; i < item.quantity; i++) orderItems.push(item.id);
      } else {
        orderItems.push(item.id);
      }
    });

    return orderItems.map((id) => parseInt(id));
  };

  const formElements = [];
  for (let key in controls) formElements.push({ id: key, config: controls[key] });
  let form = (
    <form>
      <Calendar key="calendar" label={t('mandatory-delivery')} onDateChangedHandler={(newDate) => setDate(newDate)} />
      {formElements.map((element) => (
        <Input
          key={element.id}
          elementType={element.config.elementType}
          elementConfig={element.config.elementConfig}
          value={element.config.value}
          label={element.config.label}
          invalid={!element.config.valid}
          validate={element.config.validation}
          errorMessage={element.config.errorMessage}
          touched={element.config.touched}
          changed={(event) => inputChangedHandler(event, element.id)}
        />
      ))}
      <div key="formButton" className={classes.Buttons}>
        <Button key="backButton" onClick={checkoutCancelledHandler}>
          {t('back')}
        </Button>
        <Button key="orderButton" disabled={!isValid} onClick={checkoutContinuedHandler}>
          {t('ordering')}
        </Button>
      </div>
    </form>
  );

  if (loading)
    form = (
      <div>
        <Spinner />
        <div>{t('order-progress')}</div>
      </div>
    );

  let errorMessage = null;
  if (error) errorMessage = <p className={classes.Error}>{error}</p>;

  return (
    <article className={classes.Form}>
      {errorMessage}
      {form}
    </article>
  );
};

const mapStateToProps = (props) => {
  return {
    basket: props.ordersReducer.basket,
    grandTotal: props.ordersReducer.grandTotal,
    error: props.ordersReducer.error,
    loading: props.ordersReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveOrder: (order) => dispatch(actions.saveOrder(order)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
