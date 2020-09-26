import React from 'react';

import classes from './Item.module.css';

const Item = (props) => {
  return (
    <div className={classes.Item}>
      <img src="http://localhost:3333/sweetspot_03.jpg" alt={props.title} />
      <div>
        <div>{props.title}</div>
        <div>{props.description}</div>
        <div>{props.price} RSD</div>
        <div>{props.glutenfree ? 'Gluténment' : 'Glutént tartalmaz'}</div>
        <div>{props.sugarfree ? 'Cukormentes' : 'Cukrot tartalmaz'}</div>
        <div>{props.allergens ? 'Allergéneket tartalmaz' : 'Allergének nélküli'}</div>
      </div>
    </div>
  );
};

export default Item;
