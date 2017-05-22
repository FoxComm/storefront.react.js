/* @flow */

import React, { Element } from 'react';
import { findDOMNode } from 'react-dom';
import type { HTMLElement } from 'types';
import styles from './related-list-item.css';
import { Link } from 'react-router';
import _ from 'lodash';
import { autobind } from 'core-decorators';
import * as tracking from 'lib/analytics';

import ImagePlaceholder from '../products-item/image-placeholder';

import type { Product } from 'types/api/views/product';

type State = {
  error?: any,
};

type Props = {
  product: Product,
  index: number,
}

class RelatedListItem extends React.Component {
  props: Props;
  state: State;

  static defaultProps = {
    skus: [],
  };

  get image(): Element<any> {
    const previewImageUrl = _.get(this.props.albums, [0, 'images', 0, 'src']);

    return previewImageUrl
      ? <img src={previewImageUrl} styleName="preview-image" ref="image" />
      : <ImagePlaceholder ref="image" />;
  }

  getImageNode() {
    return findDOMNode(this.refs.image);
  }

  @autobind
  handleClick() {
    const { props } = this;

    tracking.clickPdp(props, props.index);
  }

  getCollection() {
    const collectionTaxonomy = _.find(this.props.taxonomies, (taxonomyEntity) => {
      return taxonomyEntity.taxonomy === 'collection';
    });

    return _.get(collectionTaxonomy, ['taxons', 0, 0], '');
  }

  render(): HTMLElement {
    const {
      productId,
      slug,
      title,
    } = this.props;

    const productSlug = slug != null && !_.isEmpty(slug) ? slug : productId;
    const collection = this.getCollection();

    return (
      <div styleName="list-item">
        <Link styleName="link" onClick={this.handleClick} to={`/products/${productSlug}`}>
          <div styleName="overlay"></div>
          <div styleName="preview">
            {this.image}
          </div>
        </Link>

        <div styleName="text-block">
          <h1 styleName="collection" alt={collection}>
            <Link to={`/products/${productSlug}`}>{collection}</Link>
          </h1>
          <h1 styleName="title" alt={title}>
            <Link to={`/products/${productSlug}`}>{title}</Link>
          </h1>
        </div>
      </div>
    );
  }
}

export default RelatedListItem;
