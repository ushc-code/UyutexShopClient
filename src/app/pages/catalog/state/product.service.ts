import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductStore} from './product.store';
import {Observable} from 'rxjs';
import {ProductModel} from '../../../models/product.model';
import {tap} from 'rxjs/operators';

@Injectable()
export class ProductService {
  constructor(private productStore: ProductStore, private http: HttpClient) {
  }

  load(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>('http://localhost:8061/products').pipe(
      tap(products => {
        this.productStore.set(products);
        console.log('Хранилище продуктов ');
        console.log(products);
      })
    );
  }
}
