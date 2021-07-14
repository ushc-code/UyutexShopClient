import {ProductModel} from '../../../models/product.model';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {StatStore} from './stat.store';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StatsModel} from '../../../models/stats.model';
import {StatQuery} from './stat.query';
import {ID} from '@datorama/akita';

@Injectable()
export class StatService {
  constructor(private statStore: StatStore, private http: HttpClient, private statQuery: StatQuery) {
  }

  load(typeOfSort: string): Observable<StatsModel[]> {
    this.statStore.reset();
    return this.http.get<StatsModel[]>('http://localhost:8061/basket').pipe(
      tap(products => {
        const temp = [];
        products.map(product => {
          let flag = true;
          temp.map(prod => {
            if (product.product.id === prod.product.id) {
              const iter = temp.values();
              let ind = 0;
              temp.map(pr => {
                if (iter.next().value.product !== prod.product){
                  ind++;
                }
              });
              // const i = temp.// indexOf(product);
              temp[ind].count = temp[ind].count + product.count;
              flag = false;
            }
          });
          console.log(product);
          if (flag) {
            temp.push(product);
          }
        });
        let index = 0;
        temp.map(product => {
          product.id = index;
          index++;
        });
        console.log('Temp статистики');
        console.log(temp);
        this.statStore.set(temp);
        console.log('Хранилище статистики');
        console.log(this.statQuery.getAll());
      })
    );
  }

  delete(id: ID): void {
    this.http.delete('http://localhost:8061/products' + '?id=' + id).subscribe(() => {
      console.log('Удалён предмет' + id);
    });
  }
}
