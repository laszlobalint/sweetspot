import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Management.module.css';
import { checkValidity, updateObject } from '../../shared/utility';
import { managementControls } from './Management.input';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Cropper from '../../components/Cropper/Cropper';

const Management = (props) => {
  const { loading, error } = props;

  const [controls, setControls] = useState(managementControls);
  const [isValid, setIsValid] = useState(false);

  const itemSaveHandler = (event) => {
    event.preventDefault();
    const item = {
      title: controls.title.value,
      description: controls.description.value,
      picture: controls.picture.value,
      price: Number(controls.price.value),
      glutenfree: controls.glutenfree.value,
      sugarfree: controls.sugarfree.value,
      lactosefree: controls.lactosefree.value,
    };
    console.log(item);
  };

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
        valid: checkValidity(
          event.target.type === 'checkbox' ? event.target.checked : event.target.value,
          controls[controlName].validation,
        ),
        touched: true,
      }),
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) formIsValid = updatedControls[inputIdentifier].valid && formIsValid;

    setControls(updatedControls);
    setIsValid(formIsValid);
  };

  const formElements = [];
  for (let key in controls) formElements.push({ id: key, config: controls[key] });
  let form = (
    <form>
      {formElements.map((element) => (
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
      ))}
      <Cropper path={managementControls.picture.value} alt={managementControls.title.value} />
      <div className={classes.Buttons}>
        <Button disabled={!isValid} onClick={itemSaveHandler}>
          Mentés
        </Button>
      </div>
    </form>
  );

  if (loading)
    form = (
      <div>
        <Spinner />
        <div>Mentés folyamatban...</div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Management);

// https://www.npmjs.com/package/react-image-crop

// <input value={props.row.values.name} onBlur={() => clicked(props.row.values)} />
