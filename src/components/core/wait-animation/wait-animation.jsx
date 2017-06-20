// @flow

import classNames from 'classnames';
import React from 'react';
import s from './wait-animation.css';

type Props = {
  size?: string | number, // PropTypes.oneOf(['s', 'm', 'l']),
  className?: string,
};

const guessSizeLetter = (size: number): string => {
  if (size <= 32) {
    return 's';
  } else if (size <= 54) {
    return 'm';
  }
  return 'l';
};

const WaitAnimation = (props: Props) => {
  const { size = 'l', className } = props;

  let sizeLetter = size;
  let style = null;
  if (typeof size == 'number') {
    sizeLetter = guessSizeLetter(size);
    style = {
      width: `${size}px`,
      height: `${size}px`,
    };
  }
  const cls = classNames(className, s.root, s[`_size_${sizeLetter}`]);

  return (
    <div className={cls} style={style}>
      <div className={s.circle1} />
      <div className={s.circle2} />
      <div className={s.circle3} />
      <div className={s.circle4} />
    </div>
  );
};

export default WaitAnimation;
