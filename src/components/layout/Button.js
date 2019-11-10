import React from 'react';
import classnames from 'classnames';

import styles from './Button.module.scss';

export default function Button({ selected = false, children, ...props }) {
  
  return (
    <button className={classnames(styles.button, {[styles.enabled]: selected })} {...props} >
      { children }
    </button>
  )
}
