import React from 'react';
import classes from './MyInput.module.css';

export default function MyInput(props, ref) {
  return (
    <input
      /*ref={ref} ----- uncontroled component */ className={classes.myInput}
      {...props}
    />
  );
}
