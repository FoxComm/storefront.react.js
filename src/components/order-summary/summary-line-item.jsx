/* @flow */

// libs
import _ from 'lodash';
import React, { Element, PropTypes } from 'react';
import classnames from 'classnames';

// styles
import styles from './summary-line-item.css';

// components
import Currency from 'components/core/currency';

// types
import type { LineItem } from '@foxcomm/api-js/types/api/cord/line-items';
import type { ThemeData } from 'components/core/theme-provider/theme-data';
import { renderLineItemImage } from 'components/core/theme-provider/theme-data';

type Props = {
  lineItem: LineItem,
  context?: ThemeData,
  renderImage?: (lineItem: LineItem) => Element<*>,
  compact?: boolean,
  className?: string,
};

const LineItemRow = (props: Props) => {
  const defaultRenderImage = _.get(props, 'context.renderLineItemImage', renderLineItemImage);
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
          <div styleName="product-info">
            <div styleName="product-name">{lineItem.name}</div>
            <div styleName="product-variant">{/* TODO: variant info must be here */}</div>
          </div>
          <div styleName="price-data">
            <div styleName="price-and-quantity">
              <span styleName="qnt-block">{lineItem.quantity}</span>
              <span styleName="multiplier">×</span>
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

LineItemRow.contextTypes = {
  renderLineItemImage: PropTypes.func,
};

export default LineItemRow;
