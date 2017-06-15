/* @flow */

// libs
import _ from 'lodash';
import React, { Component } from 'react';

// components
import TermValueLine from 'components/core/term-value-line';
import Currency from 'components/core/currency';

// styles
import styles from './order-summary.css';

// types

import type { OrderTotals as TOrderTotals, CartTotals as TCartTotals } from '@foxcomm/api-js/types/api/cord/totals';
import type { CordPayment, GiftCardPayment } from '@foxcomm/api-js/types/api/cord/payments';

type CordTotals = TOrderTotals & {
  // right now we don't have customersExpenses in OrderTotals, but in future there is
  // will be customersExpenses field in OrderTotals type
  customersExpenses?: number,
}

type Props = {
  totals: CordTotals,
  paymentMethods?: Array<CordPayment>,
  t: (s: string) => string,
  className?: string,
  totalTitle?: string,
  orderPlaced?: ?boolean,
};

function calcGiftCardPayments(paymentMethods: ?Array<CordPayment>) {
  return _.reduce(paymentMethods, (acc: number, cordPayment: CordPayment) => {
    if (cordPayment.type == 'giftCard') {
      return acc + (cordPayment: GiftCardPayment).amount;
    }
    return acc;
  }, 0);
}

export function calcGrandTotal(totals: CordTotals, paymentMethods: ?Array<CordPayment>) {
  if ('customersExpenses' in totals) {
    return Math.max((totals: TCartTotals).customersExpenses, 0);
  } else {
    // @TODO: get rid of this block
    // after backend guys will add `customersExpenses` to OrderTotals
    // right now customersExpenses exists only in CartTotals
    return Math.max(0, totals.total - calcGiftCardPayments(paymentMethods));
  }
}

class OrderTotals extends Component {
  props: Props;

  static defaultProps = {
    t: _.identity,
    paymentMethods: [],
    totalTitle: 'Grand Total',
  };

  renderGiftCard(amount) {
    const { t, totals } = this.props;
    const authAmount = Math.min(totals.total, amount);

    if (!authAmount) {
      return null;
    }

    return (
      <li>
        <TermValueLine className={styles.value}>
          <span>{t('Gift Card')}</span>
          <Currency value={-authAmount} />
        </TermValueLine>
      </li>
    );
  }

  renderCoupon(amount) {
    const { t, totals } = this.props;
    const authAmount = Math.min(totals.total, amount);

    if (!authAmount) {
      return null;
    }

    return (
      <li>
        <TermValueLine className={styles.value}>
          <span>{t('Coupon Code')}</span>
          <Currency value={-authAmount} />
        </TermValueLine>
      </li>
    );
  }

  render() {
    const props = this.props;
    const { t, totals } = props;
    const giftCardAmount = calcGiftCardPayments(props.paymentMethods);
    const grandTotal = calcGrandTotal(totals, props.paymentMethods);

    return (
      <div className={props.className}>
        <ul styleName="price-summary">
          <li>
            <TermValueLine className={styles.value}>
              <span>{t('Subtotal')}</span>
              <Currency value={props.totals.subTotal} />
            </TermValueLine>
          </li>
          <li>
            <TermValueLine className={styles.value}>
              <span>{t('Shipping')}</span>
              <Currency value={props.totals.shipping} />
            </TermValueLine>
          </li>
          <li>
            <TermValueLine className={styles.value}>
              <span>{t('Tax')}</span>
              <Currency value={props.totals.taxes} />
            </TermValueLine>
          </li>
          {this.renderGiftCard(giftCardAmount)}
          {this.renderCoupon(totals.adjustments)}
        </ul>
        <TermValueLine className={`${styles['grand-total']} ${styles.value}`}>
          <span>{this.props.totalTitle}</span>
          <Currency value={grandTotal} />
        </TermValueLine>
      </div>
    );
  }
}

export default OrderTotals;
