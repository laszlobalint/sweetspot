import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import classes from './Management.module.css';
import * as actions from '../../store/actions';
import { checkValidity, updateObject } from '../../shared/utility';
import managementControls from './Management.input';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Cropper from '../../components/Cropper/Cropper';

const Management = (props) => {
  const { picture, loading, error, onEditItem, onDeleteItem, location } = props;

  const { t } = useTranslation();

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [controls, setControls] = useState(managementControls);
  const [isValid, setIsValid] = useState(false);
  const ref = useRef(null);

  const setInputValues = useCallback(() => {
    if (location.state) {
      controls.id.value = location.state.id;
      controls.titleHun.value = location.state.titleHun;
      controls.titleSer.value = location.state.titleSer;
      controls.titleEng.value = location.state.titleEng;
      controls.descriptionHun.value = location.state.descriptionHun;
      controls.descriptionSer.value = location.state.descriptionSer;
      controls.descriptionEng.value = location.state.descriptionEng;
      controls.price.value = location.state.price;
      controls.picture.value = location.state.picture;
      controls.glutenfree.value = location.state.glutenfree;
      controls.sugarfree.value = location.state.sugarfree;
      controls.lactosefree.value = location.state.lactosefree;
      controls.glutenfree.elementConfig.defaultChecked = location.state.glutenfree;
      controls.sugarfree.elementConfig.defaultChecked = location.state.sugarfree;
      controls.lactosefree.elementConfig.defaultChecked = location.state.lactosefree;
      setIsValid(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkPictureChange = useCallback(() => {
    if (picture && picture !== controls.picture.value) controls.picture.value = picture;
  }, [picture, controls]);

  useEffect(() => {
    ref.current.scrollIntoView();
    setInputValues();
    checkPictureChange();
    forceUpdate();
  }, [checkPictureChange, setInputValues, forceUpdate]);

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

  const editItemHandler = (event) => {
    event.preventDefault();
    const item = {
      id: controls.id.value,
      titleHun: controls.titleHun.value,
      titleSer: controls.titleSer.value,
      titleEng: controls.titleEng.value,
      descriptionHun: controls.descriptionHun.value,
      descriptionSer: controls.descriptionSer.value,
      descriptionEng: controls.descriptionEng.value,
      picture: controls.picture.value,
      price: Number(controls.price.value),
      glutenfree: controls.glutenfree.value,
      sugarfree: controls.sugarfree.value,
      lactosefree: controls.lactosefree.value,
      ingredients: [],
    };

    onEditItem(item);
  };

  const deleteItemHandler = (event) => {
    event.preventDefault();
    onDeleteItem(controls.id.value);
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
          disabled={element.config.disabled}
          changed={(event) => inputChangedHandler(event, element.id)}
        />
      ))}
      <div className={classes.Buttons}>
        <Button disabled={!isValid} onClick={editItemHandler}>
          {t('save')}
        </Button>
        <Button type={'Warning'} onClick={deleteItemHandler}>
          {t('delete')}
        </Button>
      </div>
    </form>
  );

  if (loading)
    form = (
      <div>
        <Spinner />
        <div>{t('save-progress')}</div>
      </div>
    );

  let errorMessage = null;
  if (error) errorMessage = <p className={classes.Error}>{error}</p>;

  return (
    <div ref={ref} className={classes.Management}>
      <article className={classes.Form}>
        <p>{t('management-infos')}</p>
        {errorMessage}
        {form}
      </article>
      <Cropper alt={controls.titleHun.value} />
    </div>
  );
};

const mapStateToProps = (props) => {
  return {
    picture: props.adminReducer.picture,
    error: props.adminReducer.error,
    loading: props.adminReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEditItem: (item) => dispatch(actions.editItem(item)),
    onDeleteItem: (id) => dispatch(actions.deleteItem(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Management);
