import {ID} from '@datorama/akita';
import {ProductModel} from './product.model';

export type StatsModel = {
  id: ID;
  product: ProductModel;
  count: number;
};

export function createProductModel({id, product, count}: Partial<StatsModel>): StatsModel {
  return {
    id,
    product,
    count
  } as StatsModel;
}
