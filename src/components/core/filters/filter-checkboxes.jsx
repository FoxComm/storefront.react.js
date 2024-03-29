// @flow

import React, { Element } from 'react';
import type { FilterValue, FilterTypeProps } from './types';
import styles from './filter-checkboxes.css';

const FilterCheckboxes = (props: FilterTypeProps): Element<*> => {
  const term = (props.term || '').toUpperCase();
  const { onSelectFacet = (a, b, c) => {}, values = [], renderCount } = props;

  const controls = values.map(facetValue => {
    const { count, label, selected, value } = facetValue;
    const onSelect = () => onSelectFacet(term, value, !selected);

    return (
      <div styleName="filter-value" key={label}>
        <label>
          <input
            styleName="filter-checkbox"
            type="checkbox"
            name={label}
            value={selected}
            checked={selected}
            onChange={onSelect}
          />
          <div styleName="filter-label">
            {label}
            <span styleName="count">&nbsp;{renderCount(count)}</span>
          </div>
        </label>
      </div>
    );
  });

  return (
    <form styleName="filter-block">
      {controls}
    </form>
  );
};

export default FilterCheckboxes;
