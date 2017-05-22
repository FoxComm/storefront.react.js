// @flow
import classNames from 'classnames/dedupe';
import React, { Element } from 'react';

import s from './buttons.css';

import Icon from 'components/core/icon/icon';

export type ButtonProps = {
  icon?: string,
  className?: string,
  children?: Element<any>|string,
  onClick?: (event: SyntheticEvent) => void,
  // states
  primary?: boolean,
  isLoading?: boolean|null,
  disabled?: boolean,
  isPdp?: boolean,
  secondary?: boolean,
};

const Button = (props: ButtonProps) => {
  const { isLoading, className, disabled, primary, isPdp, secondary, ...rest } = props;
  let { icon } = props;

  if (icon) {
    icon = <Icon name={icon} />;
  }

  const cls = classNames(s.button, className, {
    [s._loading]: isLoading,
    [s._primary]: primary,
    [s._pdp]: isPdp,
    [s._secondary]: secondary,
  });

  return (
    <button className={cls} disabled={isLoading || disabled} {...rest}>
      {icon}
      {props.children}
    </button>
  );
};

export default Button;
