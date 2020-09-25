import React from 'react';

import classes from './Button.module.css';

const Button = (props) => (
  <button className={[classes.Button, classes[props.type]].join(' ')} disabled={props.disabled} onClick={props.onClick}>
    {props.children}
  </button>
);

export default Button;
