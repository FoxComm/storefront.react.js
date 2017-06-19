// @flow

import React, { Element } from 'react';
import type { FilterValue, FilterTypeProps } from './types';
import styles from './filter-checkboxes.css';

const FilterCheckboxes = (props: FilterTypeProps): Element<*> => {
  const term = (props.term || '').toUpperCase();
  const {
    onSelectFacet = (a, b, c) => {},
    values = [],
    omitParenthesesOnCounts,
  } = props;

  const controls = values.map((facetValue) => {
    const { count, label, selected, value } = facetValue;
    const onSelect = () => onSelectFacet(term, value, !selected);
    const countText = omitParenthesesOnCounts ? count : `(${count})`;

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
            <span styleName="count">&nbsp;{countText}</span>
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
