
import React from 'react';
import Button from './button';

import type ButtonProps from './button';

const SecondaryButton = (props: ButtonProps) => {
  return <Button secondary {...props}>{props.children}</Button>;
};

export default SecondaryButton;