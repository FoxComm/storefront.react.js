/* @flow */

import React from 'react';
import classNames from 'classnames';

import Overlay from 'components/overlay/overlay';

import styles from './modal.css';

type Props = {
  isVisible: boolean,
  hide?: () => void,
  children?: any,
};

const Modal = (props: Props) => {
  const modalClass = classNames(styles.modal, {
    [styles.shown]: props.isVisible,
  });

  return (
    <div className={modalClass}>
      <Overlay onClick={props.hide} shown={props.isVisible} />
      <div styleName="modal-wrapper">
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
