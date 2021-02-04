import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import classes from './Input.module.css';

const Input = ({ elementConfig, elementType, value, changed, disabled, invalid, validate, touched, label, errorMessage }) => {
  const { t } = useTranslation();

  let inputElement = null;
  let validationError = null;
  const inputClasses = [classes.InputElement];

  if (invalid && validate && touched) {
    inputClasses.push(classes.Invalid);
    validationError = (
      <div className={classes.ValidationError}>
        {t('fill-properly')}
        <br />
        <p>{errorMessage}</p>
      </div>
    );
  }

  switch (elementType) {
    case 'input':
      inputElement = <input className={inputClasses.join(' ')} {...elementConfig} value={value} onChange={changed} disabled={disabled} />;
      break;
    case 'textarea':
      inputElement = <textarea className={inputClasses.join(' ')} {...elementConfig} value={value} onChange={changed} />;
      break;
    case 'select':
      inputElement = (
        <select className={inputClasses.join(' ')} value={value} onChange={changed}>
          {elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = <input className={inputClasses.join(' ')} {...elementConfig} value={value} />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

Input.propTypes = {
  elementType: PropTypes.string.isRequired,
};

export default Input;
