/* @flow */

// libs
import _ from 'lodash';
import { assoc } from 'sprout-data';
import React, { Component, Element } from 'react';
import { autobind } from 'core-decorators';
import * as tracking from 'lib/analytics';

// styles
import styles from './pdp.css';

// components
// import SecondaryButton from 'components/buttons/secondary-button';
import AddToCartBtn from 'components/core/buttons/add-to-cart-btn';
import Currency from 'components/core/currency/currency';
import Gallery from 'components/core/gallery/gallery';
import WaitAnimation from 'components/core/wait-animation/wait-animation';
import ErrorAlerts from 'components/core/alerts/error-alerts';

import ProductVariants from 'components/product-variants/product-variants';
import GiftCardForm from 'components/gift-card-form';
import ImagePlaceholder from 'components/product-image/image-placeholder';

// types
import type { Product } from '@foxcomm/api-js/types/api/product';
import type { Sku } from '@foxcomm/api-js/types/api/sku';
import type { TProductView } from './types';


type DefaultProps = {
  t: (text: string) => string,
}

type Props = DefaultProps & {
  product: ?Product,
  isLoading?: boolean,
  fetchError?: mixed,
  notFound?: boolean,
  relatedProductsList?: Element<any>,
  shareImage?: Element<any>,
  onAddLineItem?: (skuCode: string, quantity: number, attributes: Object) => Promise<mixed>,
};

type State = {
  error?: any,
  currentSku: ?Sku,
  attributes: Object,
};

export default class Pdp extends Component<DefaultProps, Props, State> {
  _productVariants: ProductVariants;

  state: State = {
    currentSku: null,
    attributes: {},
  };

  static defaultProps = {
    t: _.identity,
  };

  get isArchived(): boolean {
    return !!_.get(this.props, ['product', 'archivedAt']);
  }

  get currentSku(): ?Sku {
    return this.state.currentSku || this.sortedSkus[0];
  }

  get sortedSkus(): Array<Sku> {
    return _.sortBy(
      _.get(this.props, 'product.skus', []),
      'attributes.salePrice.v.value'
    );
  }

  @autobind
  setCurrentSku(currentSku: Sku) {
    this.setState({ currentSku });
  }

  @autobind
  setAttributeFromField({ target: { name, value } }: SyntheticInputEvent) {
    const namePath = ['attributes', ...name.split('.')];
    const stateValue = name === 'giftCard.message' ? value.split('\n').join('<br>') : value;
    this.setState(assoc(this.state, namePath, stateValue));
  }

  get productView(): TProductView {
    const attributes = _.get(this.props.product, 'attributes', {});
    const price = _.get(this.currentSku, 'attributes.salePrice.v', {});
    let images = _.get(this.currentSku, ['albums', '0', 'images'], []);
    if (_.isEmpty(images)) {
      images = _.get(this.props.product, ['albums', '0', 'images'], []);
    }
    const imageUrls = images.map(image => image.src);

    return {
      title: _.get(attributes, 'title.v', ''),
      description: _.get(attributes, 'description.v', ''),
      images: imageUrls,
      currency: _.get(price, 'currency', 'USD'),
      price: _.get(price, 'value', 0),
      skus: this.sortedSkus,
    };
  }

  get productShortDescription(): ?Element<any> {
    const shortDescription = _.get(this.props.product, 'attributes.shortDescription.v');

    if (!shortDescription) return null;

    return (
      <h2 styleName="short-description">{shortDescription}</h2>
    );
  }

  isGiftCard(props: Props = this.props): boolean {
    const tags = _.get(props.product, 'attributes.tags.v', []);
    return tags.indexOf('GIFT-CARD') !== -1;
  }

  @autobind
  addToCart(): void {
    const { onAddLineItem } = this.props;
    const unselectedFacets = this._productVariants.getUnselectedFacets();
    if (unselectedFacets.length) {
      this._productVariants.flashUnselectedFacets(unselectedFacets);
      return;
    }
    const skuCode = _.get(this.currentSku, 'attributes.code.v', '');
    tracking.addToCart(this.productView, 1);
    if (onAddLineItem) {
      onAddLineItem(skuCode, 1, this.state.attributes)
        .then(() => {
          this.setState({
            attributes: {},
            currentSku: null,
          });
        })
        .catch((ex) => {
          this.setState({
            error: ex,
          });
        });
    }
  }

  renderGallery() {
    const { images } = this.productView;

    return !_.isEmpty(images)
      ? <Gallery images={images} />
      : <ImagePlaceholder largeScreenOnly />;
  }

  get productDetails(): Element<any> {
    const description = _.get(this.props.product, 'attributes.description.v', '');
    const descriptionList = _.get(this.props.product, 'attributes.description_list.v', '');
    return (
      <div styleName="body">
        <div
          styleName="description"
          dangerouslySetInnerHTML={{__html: description}}
        />
        <ul
          styleName="description-list"
          dangerouslySetInnerHTML={{__html: descriptionList}}
        />
      </div>
    );
  }

  @autobind
  handleSkuChange(sku: ?Sku) {
    if (sku) {
      this.setCurrentSku(sku);
    }
  }

  @autobind
  getTaxonValue(name: string): ?string {
    const taxons = _.get(this.props.product, 'taxons', []);
    const taxonomy = _.find(taxons, (taxonomyEntity) => {
      const taxonomyName = _.get(taxonomyEntity, 'attributes.name.v');
      return name === taxonomyName;
    });

    return _.get(taxonomy, ['taxons', '0', 'attributes', 'name', 'v']);
  }

  get productCategory(): ?Element<any> {
    let gender = this.getTaxonValue('gender');
    const type = this.getTaxonValue('type');

    if (gender && type) {
      if (gender.toLowerCase() === 'men') {
        gender = 'men\'s';
      } else if (gender.toLowerCase() === 'women') {
        gender = 'women\'s';
      }

      return (
        <div>{`${gender} ${type}`}</div>
      );
    }
  }

  get productForm(): Element<any> {
    if (this.isGiftCard()) {
      return (
        <GiftCardForm
          productView={this.productView}
          onSkuChange={this.setCurrentSku}
          selectedSku={this.currentSku}
          attributes={this.state.attributes}
          onAttributeChange={this.setAttributeFromField}
        />
      );
    }
    return (
      <ProductVariants
        ref={(_ref) => { this._productVariants = _ref; }}
        product={this.props.product}
        productView={this.productView}
        selectedSku={this.currentSku}
        onSkuChange={this.handleSkuChange}
      />
    );
  }

  get productPrice(): ?Element<any> {
    if (this.isGiftCard()) return null;
    const {
      currency,
      price,
      skus,
    } = this.productView;

    const salePrice = _.get(skus[0], 'attributes.salePrice.v.value', 0);
    const retailPrice = _.get(skus[0], 'attributes.retailPrice.v.value', 0);

    if (retailPrice > salePrice) {
      return (
        <div styleName="price">
          <Currency
            styleName="retail-price"
            value={retailPrice}
            currency={currency}
          />
          <Currency
            styleName="on-sale-price"
            value={salePrice}
            currency={currency}
          />
        </div>
      );
    }

    return (
      <div styleName="price">
        <Currency value={price} currency={currency} />
      </div>
    );
  }

  render(): Element<any> {
    const {
      t,
      isLoading,
      notFound,
      fetchError,
    } = this.props;

    if (isLoading) {
      return <WaitAnimation />;
    }

    if (notFound || this.isArchived) {
      return <p styleName="not-found">{t('Product not found')}</p>;
    }

    if (fetchError) {
      return <ErrorAlerts error={fetchError} />;
    }
    const title = this.isGiftCard() ? t('Gift Card') : this.productView.title;

    return (
      <div styleName="container">
        <div styleName="body">
          <div styleName="sixty">
            {this.renderGallery()}
          </div>
          <div styleName="forty">
            <div styleName="category">{this.productCategory}</div>
            <h1 styleName="title">{title}</h1>
            <ErrorAlerts error={this.state.error} />
            {this.productPrice}
            {this.productForm}
            <div styleName="cart-actions">
              <AddToCartBtn
                onClick={this.addToCart}
              />
              {/* <SecondaryButton styleName="one-click-checkout">1-click checkout</SecondaryButton> */}
            </div>
          </div>
        </div>
        <div styleName="title-block">
          <h1 styleName="title-secondary">{title}</h1>
          {this.productShortDescription}
        </div>
        {this.productDetails}
        <div styleName="share-block">
          <div styleName="share-title">
            Share How You Wear It
          </div>
          <p styleName="share-description">
            For your change to be featured in our photo gallery<br />
            tag your favorite Pure photo using #3stripestyle.
          </p>
          {this.props.shareImage}
        </div>
        {this.props.relatedProductsList}
      </div>
    );
  }
}

