/* @flow weak */

// libs
import _ from 'lodash';
import React, { Component } from 'react';

// styles
import styles from './related-products-list.css';

// components
import WaitAnimation from 'components/core/wait-animation/wait-animation';
import ListItem from './related-list-item';

type Props = {
  list: ?Array<Object>,
  productsOrder: ?Array<number>,
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

  renderProducts() {
    const { list, productsOrder } = this.props;

    if (_.isEmpty(list)) return null;

    let sortedProductsList = [];
    _.forEach(productsOrder, function(productId) {
      sortedProductsList = _.concat(sortedProductsList, _.find(list, { productId }));
    });

    const avoidKeyCollision = 9999;

    const { startingId } = this.state;
    const endingId = Math.min(sortedProductsList.length, startingId + 6);

    const toDisplay = _.slice(sortedProductsList, startingId, endingId);
    
    return _.map(toDisplay, (item, index) => {
      return (
        <ListItem
          {...item}
          index={index}
          key={`product-${_.get(item, 'id', _.random(avoidKeyCollision))}`}
          ref={`product-${_.get(item, 'id', _.random(avoidKeyCollision))}`}
        />
      );
    });
  }

  render(): Element<mixed> {
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
