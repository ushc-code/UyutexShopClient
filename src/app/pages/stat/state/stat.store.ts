import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Injectable} from '@angular/core';
import {StatsModel} from '../../../models/stats.model';

export interface StatState extends EntityState<StatsModel> {
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({name: 'stat', resettable: true, idKey: 'id'})
export class StatStore extends EntityStore<StatState, StatsModel> {
  constructor() {
    super();
  }
}
