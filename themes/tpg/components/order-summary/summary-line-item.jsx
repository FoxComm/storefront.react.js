/* @flow */

// libs
import _ from 'lodash';
import React, { PropTypes } from 'react';

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
};

const LineItemRow = (props: Props) => {
  const defaultRenderImage = _.get(props, 'context.renderLineItemImage', renderLineItemImage);
  const { lineItem, renderImage = defaultRenderImage } = props;
  return (
    <tr>
      <td styleName="product-image">
        {renderImage(lineItem)}
      </td>
      <td>
        <span styleName="product-info">
          <span styleName="product-name">{lineItem.name}</span>
          <span styleName="product-qty">{lineItem.quantity}</span>
        </span>
      </td>
      <td styleName="product-price">
        <Currency value={lineItem.totalPrice} />
      </td>
    </tr>
  );
};

LineItemRow.contextTypes = {
  renderLineItemImage: PropTypes.func,
};

export default LineItemRow;
