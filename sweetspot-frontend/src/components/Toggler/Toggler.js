import React from 'react';

import classes from './Toggler.module.css';

const Toggler = (props) => (
  <label className={classes.Toggler} onClick={props.toggle}>
    <span></span>
  </label>
);

export default Toggler;
