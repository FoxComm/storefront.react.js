/* @flow weak */

import _ from 'lodash';
import React, { Component } from 'react';
import s from './select.css';
import { autobind } from 'core-decorators';

/* eslint react/sort-comp: 0 */

type Props = {
  items: Array<any>,
  selectedItem: any,
  onSelect: Function,
  sortItems: boolean,
  getItemValue: Function,
};

class Select extends Component {
  props: Props;

  static defaultProps = {
    onSelect() {},
    sortItems: false,
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
    this.props.onSelect(
      _.find(this.props.items, item => this.props.getItemValue(item) == event.target.value)
    );
  }

  render() {
    return (
      <div className={s.block}>
        <select className={s.select} value={this.selectedValue()} onChange={this.handleChange}>
          {_.map(this.values(), this.renderItem)}
        </select>
      </div>
    );
  }
}

export default Select;