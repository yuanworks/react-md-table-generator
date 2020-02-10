import React from 'react';
import classnames from 'classnames';

import styles from './Button.module.scss';

export default function Button({ selected = false, children, icon, type, size, ...props }) {
  
  const styleTypes = [];
  const types = type && type.split(' ');
  types && types.forEach(myType =>  styleTypes.push(styles['type-' + myType]));

  const classes = classnames(
    styles.button,
    styleTypes,
    { [styles.enabled]: selected, [styles['size-'+size]]: size }
  );

  return (
    <button className={classes} {...props} >
      { icon && <span className={styles.icon}>{ icon }</span> }
      { children && <div className={styles.text}>{ children }</div> }
    </button>
  )
}

/* prop types
{

  type:
  size:
  icon:
  selected:

}
*/