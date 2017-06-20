// @flow

export type FilterValue = {
  count: number,
  label: string,
  value: any,
  selected: boolean,
};

export type Filter = {
  key: string,
  values: Array<FilterValue>,
};

export type FilterTypeProps = {
  onSelectFacet?: Function,
  term?: string,
  values?: Array<FilterValue>,
  renderCount: (count: number) => string,
};


export type FilterGroupProps = {
  children?: Element<FilterTypeProps>|Array<Element<FilterTypeProps>>,
  label: string,
  term: string,
  values?: Array<FilterValue>,
  onClearFacet?: Function,
  onSelectFacet?: Function,
  initiallyExpanded?: boolean,
  renderCount: (count: number) => string,
};
