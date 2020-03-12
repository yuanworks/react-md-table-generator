import React from 'react';
import classnames from 'classnames';
import { IoMdClose } from 'react-icons/io';

import styles from "./Modal.module.scss";

export function Modal({ isOpen, className, children }) {
  return isOpen && (
    <div role="dialog" tabIndex='-1' className={styles.background}>
      <div className={classnames(styles.modal, className)}>
        { children }
      </div>
    </div>
  );
}

export function ModalHeader({ className, children, toggle }) {
  return (
    <div className={classnames(styles.header, className)}>
      { children }
      <button className={styles.closeButton} onClick={toggle}><IoMdClose size={16} /></button>
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