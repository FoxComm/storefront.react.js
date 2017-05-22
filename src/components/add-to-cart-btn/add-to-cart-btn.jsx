/* @flow */

// libs
import React from 'react';

// components
import Button from 'components/buttons/button';

type Props = {
  onClick?: () => void,
  className?: string,
};

const AddToCartBtn = (props: Props) => {
  return (
    <Button {...props} isPdp>
      Add To Cart
    </Button>
  );
};

export default AddToCartBtn;
