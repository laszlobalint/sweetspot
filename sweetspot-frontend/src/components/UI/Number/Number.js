import React from 'react';

import classes from './Number.module.css';

const Number = (props) => (
  <div className={classes.Quantity}>
    <input type="number" min="1" max="99" step="1" title="number" onChange={props.onChanged} value={props.value} />
    <div className={classes.QuantityNav}>
      <div className={[classes.QuantityButton, classes.QuantityUp].join(' ')} onClick={props.onClickedMore}>
        +
      </div>
      <div className={[classes.QuantityButton, classes.QuantityDown].join(' ')} onClick={props.onClickedLess}>
        -
      </div>
    </div>
  </div>
);

export default Number;
