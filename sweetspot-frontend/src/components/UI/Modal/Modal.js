import React from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {
  const assignedClasses = [classes.Modal];
  props.show ? assignedClasses.push(classes.Show) : assignedClasses.push(classes.Hide);

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.closed} />
      <div className={assignedClasses.join(' ')}>{props.children}</div>
    </Aux>
  );
};

export default React.memo(Modal, (prevProps, nextProps) => prevProps.show === nextProps.show && prevProps.children === nextProps.children);
