/* @flow */

import _ from 'lodash';
import React from 'react';
import { skuIdentity } from '@foxcomm/wings/lib/paragons/sku';

// components
import LineItemRow from './summary-line-item';

// styles
import styles from './product-table.css';

// types
import type { LineItem } from '@foxcomm/api-js/types/api/cord/line-items';

type Props = {
  skus: Array<LineItem>,
};

const Products = (props: Props) => {
  const rows = _.map(props.skus, (item: LineItem) => {
    return <LineItemRow lineItem={item} key={skuIdentity(item)} />;
  });

  return (
    <table styleName="products">
      <thead>
      <tr>
        <th colSpan="2">
            <span styleName="info">
              <span>ITEM</span>
              <span>QTY</span>
            </span>
        </th>
        <th styleName="price">PRICE</th>
      </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};

export default Products;
