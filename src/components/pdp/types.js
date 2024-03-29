import type { Sku } from '@foxcomm/api-js/types/api/sku';

export type TProductView = {
  title: string,
  description: string,
  images: Array<string>,
  currency: string,
  price: number | string,
  skus: Array<Sku>,
};
