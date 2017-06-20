// @flow

import React, { Component } from 'react';
import FilterHeader from './filter-header';

import styles from './filter-group.css';
import type { FilterGroupProps } from './types';

type State = {
  expanded: boolean,
};

type DefaultProps = {
  renderCount: (count: number) => string,
};

export default class FilterGroup extends Component {
  props: FilterGroupProps;
  state: State = { expanded: !!this.props.initiallyExpanded };

  static defaultProps: DefaultProps = {
    renderCount: (count: number): string => `(${count})`,
  };

  selectedCount = () => {
    const { values = [] } = this.props;
    return values.reduce((acc, val) => {
      const increment = val.selected ? 1 : 0;
      return acc + increment;
    }, 0);
  };

  toggleExpansion = () => this.setState({ expanded: !this.state.expanded });

  render() {
    const { children, label, term, values, renderCount } = this.props;
    const {
      onClearFacet = () => {},
      onSelectFacet = () => {},
    } = this.props;
    const { expanded } = this.state;

    const updatedChildren = React.Children.map(children, (child) => {
      return React.cloneElement(child, { onSelectFacet, term, values, renderCount });
    });

    return (
      <div styleName="group">
        <FilterHeader
          renderCount={renderCount}
          count={this.selectedCount()}
          expanded={expanded}
          onClear={onClearFacet}
          onClick={this.toggleExpansion}
        >
          {label}
        </FilterHeader>
        {expanded && updatedChildren}
      </div>
    );
  }
}
