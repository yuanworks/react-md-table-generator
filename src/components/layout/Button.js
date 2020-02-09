import React from 'react';
import classnames from 'classnames';

import styles from './Button.module.scss';

export default function Button({ selected = false, children, icon, ...props }) {
  
  return (
    <button className={classnames(styles.button, {[styles.enabled]: selected })} {...props} >
      { icon && <span className={styles.icon}>{ icon }</span> }
      { children && <div className={styles.text}>{ children }</div> }
    </button>
  )
}
