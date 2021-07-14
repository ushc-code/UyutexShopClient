import {ProductModel} from '../../../models/product.model';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Injectable} from '@angular/core';

export interface ProductState extends EntityState<ProductModel> {
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({name: 'products', resettable: true})
export class ProductStore extends EntityStore<ProductState, ProductModel> {
  constructor() {
    super();
  }
}
