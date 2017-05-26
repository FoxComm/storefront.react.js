/* @flow weak */

// libs
import _ from 'lodash';
import React, { Component, Element } from 'react';

// styles
import styles from './related-products-list.css';

// components
import WaitAnimation from 'components/core/wait-animation/wait-animation';
import ListItem from './related-list-item';

// types
import type { Product } from '@foxcomm/api-js/types/api/views/product';

type Props = {
  list: ?Array<Product>,
  productsOrder?: Array<number>,
  isLoading: ?boolean,
  title: string,
};

type State = {
  shownProducts: {[productId: string]: number},
  startingId: number,
}

class RelatedProductsList extends Component {
  props: Props;
  state: State = {
    shownProducts: {},
    startingId: 0,
  };

  static defaultProps = {
    title: 'You Might Also Like',
  };

  renderProducts(): ?Array<Element<ListItem>> {
    const { list, productsOrder } = this.props;

    if (list == null || list.length == 0) return null;

    let sortedProductsList: Array<Product> = list;

    if (productsOrder) {
      sortedProductsList = _.map(productsOrder, productId => _.find(list, {productId}));
    }
    const { startingId } = this.state;
    const toDisplay = sortedProductsList.slice(startingId, startingId + 6);
    
    return _.map(toDisplay, (item, index) => {
      return (
        <ListItem
          {...item}
          index={index}
          key={`product-${_.get(item, 'id', index)}`}
        />
      );
    });
  }

  render(): ?Element<any> {
    const { isLoading, list, title } = this.props;

    if (isLoading) {
      return <WaitAnimation />;
    }

    if (_.isEmpty(list)) return null;

    return (
      <div styleName="list-wrapper">
        <div styleName="related-title">
          {title}
        </div>
        <div styleName="list">
          {this.renderProducts()}
        </div>
      </div>
    );
  }
}

export default RelatedProductsList;
