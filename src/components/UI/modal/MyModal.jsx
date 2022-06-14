import React from 'react';
import classes from './MyModal.module.css';

export default function MyModal({ children, visible, setVisible }) {
  const rootClasses = [classes.myModal];

  if (visible) {
    rootClasses.push(classes.active);
  }

  return (
    <div className={rootClasses.join(' ')}>
      <div className={classes.myModalContent}>{children}</div>
    </div>
  );
}
