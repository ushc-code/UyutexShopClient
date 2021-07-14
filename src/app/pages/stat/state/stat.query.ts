import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {StatState, StatStore} from './stat.store';



@Injectable({providedIn: 'root'})
export class StatQuery extends QueryEntity<StatState> {
  constructor(protected statStore: StatStore) {
    super(statStore);
  }
}
