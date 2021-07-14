import {ID} from '@datorama/akita';

export type ProductModel = {
  id: ID;
  name: string;
  length_model: number;
  width: number;
  height: number;
  vendor: string;
  cost: number;
};

export function createProductModel({id, name, length_model, width, height, vendor, cost}: Partial<ProductModel>): ProductModel {
  return {
    id,
    name,
    length_model,
    width,
    height,
    vendor,
    cost
  } as ProductModel;
}
