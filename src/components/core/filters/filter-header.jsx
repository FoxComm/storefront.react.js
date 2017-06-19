// @flow

import React, { Element } from 'react';
import styles from './filter-header.css';

type Props = {
  children?: Element<*>|Array<Element<*>>,
  count: number,
  expanded: boolean,
  onClear: Function,
  onClick: Function,
  renderCount: (count: number) => string,
};

const FilterHeader = (props: Props): Element<*> => {

  const { children, count, expanded, onClear, onClick, renderCount } = props;
  const iconStyle = expanded ? 'icon-minus' : 'icon-plus';

  return (
    <div styleName="header">
      <div styleName={iconStyle} />
      <div styleName="title-block">
        <span>
          <a
            styleName="title"
            onClick={onClick}
          >
            {children}
            {count > 0 && (
              <span styleName="count">&nbsp;{renderCount(count)}</span>
            )}
          </a>
        </span>
        {count > 0 && (
          <span>
            <a
              styleName="clear"
              onClick={onClear}
            >Clear</a>
          </span>
        )}
      </div>
    </div>
  );
};

export default FilterHeader;
