/* @flow */

// libs
import React, { Element } from 'react';
import classnames from 'classnames';

// styles
import styles from './summary-line-item.css';

// components
import Currency from 'components/core/currency';

// types
import type { LineItem } from '@foxcomm/api-js/types/api/cord/line-items';

type Props = {
  lineItem: LineItem,
  renderImage?: (lineItem: LineItem) => Element<*>,
  compact?: boolean,
  className?: string,
};

function defaultRenderImage(lineItem: LineItem): Element<*> {
  return <img src={lineItem.imagePath} width="50" height="50" />;
}

const LineItemRow = (props: Props) => {
  const { lineItem, renderImage = defaultRenderImage } = props;

  const className = classnames(styles['line-item'], props.className, {
    [styles['-tableView']]: !props.compact,
  });

  return (
    <div className={className}>
      <div styleName="content">
        <div styleName="product-image">
          {renderImage(lineItem)}
        </div>
        <div styleName="product-data">
          <div styleName="pxroduct-info">
            <div styleName="product-name">{lineItem.name}</div>
            <div styleName="product-variant">{/* TODO: variant info must be here */}</div>
          </div>
          <div styleName="price-data">
            <div styleName="price-and-quantity">
              <span styleName="qnt-block">{lineItem.quantity}</span>
              <span>×</span>
              <span styleName="price-block"><Currency value={lineItem.price} /></span>
            </div>
            <div styleName="product-price">
              <Currency value={lineItem.totalPrice} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineItemRow;
