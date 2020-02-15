import React from 'react';
import classnames from 'classnames';
import styles from './TextArea.module.scss';

export default function TextArea({ className, ...props }) {
  return (
    <textarea className={classnames(styles.textArea, className)} {...props} />
  );
}
