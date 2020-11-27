import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import classes from './Upload.module.css';
import * as actions from '../../store/actions';
import { checkValidity, updateObject } from '../../shared/utility';
import uploadControls from './Upload.input';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Cropper from '../../components/Cropper/Cropper';

const Upload = (props) => {
  const { picture, loading, error, onSaveNewItem } = props;

  const { t } = useTranslation();

  const [controls, setControls] = useState(uploadControls);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (picture && !controls.picture.value) {
      const updatedControls = updateObject(controls, {
        picture: updateObject(controls['picture'], {
          value: `http://localhost:3333/${picture}`,
          valid: checkValidity(picture, controls['picture'].validation),
          touched: true,
        }),
      });

      let formIsValid = true;
      for (let inputIdentifier in updatedControls) formIsValid = updatedControls[inputIdentifier].valid && formIsValid;

      setControls(updatedControls);
      setIsValid(formIsValid);
    }
  }, [picture, controls]);

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

  const itemSaveHandler = (event) => {
    event.preventDefault();
    const item = {
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

    onSaveNewItem(item);
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
        <Button disabled={!isValid} onClick={itemSaveHandler}>
          {t('save')}
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
    <div className={classes.Upload}>
      <article className={classes.Form}>
        <p>{t('upload-infos')}</p>
        {errorMessage}
        {form}
      </article>
      <Cropper alt={controls.title.value} />
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
    onSaveNewItem: (item) => dispatch(actions.saveNewItem(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
