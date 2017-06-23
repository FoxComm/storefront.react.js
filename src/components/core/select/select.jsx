/* @flow weak */

import _ from 'lodash';
import React, { Component } from 'react';
import classnames from 'classnames';
import s from './select.css';
import { autobind } from 'core-decorators';

/* eslint react/sort-comp: 0 */

type ItemType = mixed;

type Props = {
  items: Array<ItemType>,
  selectedItem: ItemType,
  onSelect: (item: ItemType) => void,
  sortItems: boolean,
  getItemValue: (item: ItemType) => string,
  className?: string,
};

class Select extends Component {
  props: Props;

  static defaultProps = {
    onSelect() {},
    sortItems: false,
    getItemValue: _.identity,
  };

  @autobind
  values() {
    return _.map(this.props.items, this.props.getItemValue);
  }

  @autobind
  selectedValue() {
    return this.props.getItemValue(this.props.selectedItem);
  }

  renderItem(item) {
    return <option className={s.option} value={item} key={item}>{item}</option>;
  }

  @autobind
  handleChange(event) {
    this.props.onSelect(_.find(this.props.items, item => this.props.getItemValue(item) == event.target.value));
  }

  render() {
    return (
      <div className={classnames(s.block, this.props.className)}>
        <select className={s.select} value={this.selectedValue()} onChange={this.handleChange}>
          {_.map(this.values(), this.renderItem)}
        </select>
      </div>
    );
  }
}

export default Select;
