/* @flow */

// libs
import React from 'react';

// styles
import styles from './summary-line-item.css';

// components
import Currency from 'components/core/currency';

// types
import type { LineItem } from '@foxcomm/api-js/types/api/cord/line-items';

type Props = {
  lineItem: LineItem,
  renderImage?: (lineItem: LineItem) => Element<*>,
};

function defaultRenderImage(lineItem: LineItem): Element<*> {
  return <img src={lineItem.imagePath} width="63" height="63" />;
}

const LineItemRow = (props: Props) => {
  const { lineItem } = props;
  return (
    <tr>
      <td styleName="product-image">
        {defaultRenderImage(lineItem)}
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

export default LineItemRow;
