import React from 'react';
import classnames from 'classnames';

import styles from "./Modal.module.scss";

export function Modal({ isOpen, className, children }) {
  return isOpen && (
    <div className={styles.background}>
      <div className={classnames(styles.modal, className)}>
        { children }
      </div>
    </div>
  );
}

export function ModalBody({ className, children }) {
  return (
    <div className={classnames(styles.body, className)}>
      { children }
    </div>
  );
}

export function ModalFooter({ className, children }) {
  return (
    <div className={classnames(styles.footer, className)}>
      { children }
    </div>
  );
}