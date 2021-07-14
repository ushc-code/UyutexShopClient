import {ID} from '@datorama/akita';

export type OrderModel = {
  id_order: ID;
  id_basket: number;
  status: string;
  date: string;
  price_order: number;
};

export function createUserModel({id_order, id_basket, status, date, price_order}: Partial<OrderModel>): OrderModel {
  return {
    id_order,
    id_basket,
    status,
    date,
    price_order,
  } as OrderModel;
}
