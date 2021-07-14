import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Injectable} from '@angular/core';
import {OrderModel} from '../../../models/order.model';

export interface OrderState extends EntityState<OrderModel> {
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({name: 'order', resettable: true, idKey: 'id_order'})
export class OrderStore extends EntityStore<OrderState, OrderModel> {
  constructor() {
    super();
  }
}
