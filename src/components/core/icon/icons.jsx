import React from 'react';
import Icon from './icon';
import s from './icons.css';

let __sprite__ = { path: '../../../images/svg-icons/*.svg', name: 'assets/svg/[hash].icons.svg' };

const iconSet = [
  'add',
  'cart',
  'chevron-left',
  'close',
  'cvv-american-express',
  'cvv-visa',
  'facebook',
  'google',
  'hamburger',
  'instagram',
  'magnifying-glass',
  'payment-american-express',
  'payment-diners-club',
  'payment-discover',
  'payment-jcb',
  'payment-master-card',
  'payment-visa',
  'pinterest',
  'ripple',
  'twitter',
];

require('webpack-svgstore-plugin/src/helpers/svgxhr')(__sprite__);

const Icons = () => {
  const icons = iconSet.map(iconType =>
    <div key={iconType} className={s.box}>
      <div className={s.iconWrapper}>
        <Icon name={iconType} size={false} />
      </div>
      <span className={s.text}>{iconType}</span>
    </div>
  );

  return (
    <div className={s.container}>
      {icons}
    </div>
  );
};

export default Icons;
