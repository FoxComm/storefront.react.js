/* @flow */

// libs
import _ from 'lodash';
import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import classNames from 'classnames/dedupe';

// components
import Totals, { calcGrandTotal } from './totals';
import Currency from 'components/core/currency';
import ProductTable from './product-table';
import GoogleConversion from 'components/core/google/conversion';

// styles
import styles from './order-summary.css';

// types
import type { Cart } from '@foxcomm/api-js/types/api/cart';

type ConversionParams = {
  id: number,
  label: string,
};

type Props = {
  cord: Cart,
  conversionParams?: ConversionParams,
  t: (s: string) => string,
  header?: mixed,
  initiallyCollapsed?: boolean,
  className?: string,
  // modifiers
  embedded?: boolean,
  confirmationPage?: boolean,
};

type State = {
  isCollapsed: boolean,
};

class OrderSummary extends Component {
  props: Props;

  static defaultProps = {
    t: _.identity,
    initiallyCollapsed: false,
    embedded: false,
  };

  state: State = {
    isCollapsed: !!this.props.initiallyCollapsed,
  };

  @autobind
  toggleCollapsed() {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });
  }

  getOrderPlacedTrackingCode(grandTotal: number) {
    const { conversionParams } = this.props;
    if (!conversionParams || grandTotal <= 0) {
      return null;
    }

    const params = {
      value: grandTotal / 100,
      orderId: this.props.cord.referenceNumber,
      ...conversionParams,
    };

    return <GoogleConversion params={params} />;
  }

  render() {
    const props = this.props;
    const { t, cord } = props;
    const grandTotal = calcGrandTotal(cord.totals, cord.paymentMethods);

    const style = classNames(
      {
        [styles.collapsed]: this.state.isCollapsed,
        [styles.embedded]: this.props.embedded,
      },
      props.className
    );

    const header = (
      <header styleName="header" onClick={this.toggleCollapsed}>
        <div styleName="title">{t('ORDER TOTAL')}</div>
        <Currency styleName="price" value={grandTotal} />
      </header>
    );

    return (
      <section styleName="order-summary" className={style}>
        {this.getOrderPlacedTrackingCode(grandTotal)}
        {this.props.header !== void 0 ? this.props.header : header}

        <div styleName="content">
          <ProductTable skus={cord.lineItems.skus} compact={props.confirmationPage} />
          <Totals totals={cord.totals} paymentMethods={cord.paymentMethods} />
        </div>
      </section>
    );
  }
}

export default OrderSummary;
