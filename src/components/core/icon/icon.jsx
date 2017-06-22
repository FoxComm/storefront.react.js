/* @flow */
import React from 'react';
import classnames from 'classnames';
import s from './icon.css';

type Props = {
  /** icon type */
  name: string,
  /** svg optional className */
  className?: string,
  /** you can pass false in case if you want specify size manually via `fc-icon__icon-<name>` class for example */
  size?: 's' | 'm' | 'x' | false,
  prefix?: string,
};

/**
 * Icon is a simple component for representing SVG icons.
 * `@foxcomm/storefront-react/lib/sprite.svg` sprite should be included to the page.
 *
 * @function Icon
 */

const Icon = (props: Props) => {
  const { name, className, size = 's', prefix = 'fc-icon-', ...rest } = props;
  const classNames = classnames(s.icon, s[`icon-${name}`], className, size ? s[`-size-${size}`] : null);
  return (
    <svg className={classNames} {...rest}>
      <use xlinkHref={`#${prefix}${name}`} />
    </svg>
  );
};

export default Icon;
