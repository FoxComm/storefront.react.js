import React, { Element } from 'react';
// types
import type { LineItem } from '@foxcomm/api-js/types/api/cord/line-items';

export function renderLineItemImage(lineItem: LineItem): Element<*> {
  return <img src={lineItem.imagePath} width="50" height="50" />;
}

export type ThemeData = {
  renderLineItemImage(lineItem: LineItem): Element<*>,
};
