import React from 'react';
import PropTypes from 'prop-types';

import classes from './Input.module.css';

const Input = (props) => {
  const { elementConfig, elementType, value, changed, invalid, validate, touched, label } = props;

  let inputElement = null;
  let validationError = null;
  const inputClasses = [classes.InputElement];

  if (invalid && validate && touched) {
    inputClasses.push(classes.Invalid);
    validationError = <p className={classes.ValidationError}>Kérem, töltse ki a mezőt megfelelően!</p>;
  }

  switch (elementType) {
    case 'input':
      inputElement = <input className={inputClasses.join(' ')} {...elementConfig} value={value} onChange={changed} />;
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
