import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {BasketState, BasketStore} from './basket.store';



@Injectable({providedIn: 'root'})
export class BasketQuery extends QueryEntity<BasketState> {
  constructor(protected basketStore: BasketStore) {
    super(basketStore);
  }
}
