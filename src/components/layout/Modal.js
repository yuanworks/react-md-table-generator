import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import classnames from 'classnames';
import { IoMdClose } from 'react-icons/io';

import styles from "./Modal.module.scss";

export function Modal({ isOpen, className, children, toggle }) {

  const [ openSpring, setOpenSpring ] = useState(false);
  const modalRef = useRef();

  useEffect(() => { isOpen && setOpenSpring(isOpen) }, [ isOpen ]);

  const toggleModal = (e) => {
    if (toggle) {
      if (e.target === modalRef.current) {
        toggle();
      }
    }
  }

  // TODO --> try useTransition instead:

  const opacity = useSpring({
    opacity : isOpen? 1 : 0,
    onRest  : () => !isOpen && setOpenSpring(false),
    config: { precision: 0.5 },
  });

  const slide = useSpring({
    top  : isOpen? '50%' : '55%',
  });

  return openSpring && (
    <animated.div role="dialog" tabIndex='-1' className={styles.background} style={opacity} onClick={toggleModal} ref={modalRef}>
      <animated.div className={classnames(styles.modal, className)} style={slide}>
        { children }
      </animated.div>
    </animated.div>
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