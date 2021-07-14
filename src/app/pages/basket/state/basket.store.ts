import {ProductModel} from '../../../models/product.model';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Injectable} from '@angular/core';

export interface BasketState extends EntityState<ProductModel> {
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({name: 'basket', resettable: true})
export class BasketStore extends EntityStore<BasketState, ProductModel> {
  constructor() {
    super();
  }
}
