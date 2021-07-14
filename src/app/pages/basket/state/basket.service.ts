import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BasketStore} from './basket.store';
import {Observable} from 'rxjs';
import {ProductModel} from '../../../models/product.model';
import {map} from 'rxjs/operators';
import {UserQuery} from '../../login/state/user.query';
import {ProductQuery} from '../../catalog/state/product.query';
import {ID} from '@datorama/akita';
import {BasketQuery} from './basket.query';
import {ProductService} from '../../catalog/state/product.service';
import {Router} from '@angular/router';
import {OrderService} from '../../person/state/order.service';

@Injectable()
export class BasketService {

  constructor(private basketStore: BasketStore,
              private basketQuery: BasketQuery,
              private http: HttpClient,
              private userQuery: UserQuery,
              private productQuery: ProductQuery,
              private productService: ProductService) {
  }

  load(): Observable<void[]> {
    this.productService.load().subscribe();
    this.basketStore.remove();
    return this.http.get<ID[]>('http://localhost:8061/basket_prod' + '?userId=' + this.userQuery.getLoggedUser().id).pipe(
      map(prods => prods.map(prod => {
        this.basketStore.add(this.productQuery.getEntity(prod));
      })));
  }

  public setProductCount(prodId: ID, idBasket: number, num: number): void {
    const data = {
      basketId: idBasket,
      productId: prodId.valueOf(),
      count: num
    };
    console.log(data);
    this.sendProduct(data).subscribe();
  }

  public getIdBasket(): Observable<number> {
    // console.log(this.userQuery.getLoggedUser());
    return this.http.get<number>('http://localhost:8061/basket' + '?userId=' + this.userQuery.getLoggedUser().id);
  }

  public getProductCount(productId: ID, idBasket: number): Observable<number> {
    return this.http.get<number>('http://localhost:8061/basket_prod_count' + '?basketId=' + idBasket + '&' + 'productId=' + productId);
  }

  deleteProduct(prodId: ID, idBasket: number, num: number): any {
    const data = {
      basketId: idBasket,
      productId: prodId.valueOf(),
      count: num
    };
    console.log('Удалено');
    console.log(data);
    this.delete(data).subscribe(res => {
      this.basketStore.remove();
      console.log('осталось ' + this.basketQuery.getCount().valueOf());
    });
  }

  private delete(data: any): Observable<any> {
    return this.http.delete('http://localhost:8061/basket' + '?basketId=' + data.basketId + '&' + 'productId=' + data.productId + '&' + 'count=' + data.count);
  }

  addProduct(product: ProductModel): any {
    const data = {
      basketId: 0,
      productId: '',
      count: 0
    };
    this.getIdBasket().subscribe(res => {
      data.basketId = res.valueOf();
      console.log(product.id.valueOf().toString());
      data.productId = product.id.valueOf().toString();
      data.count = 1;
      this.sendProduct(data).subscribe();
    });
  }

  private sendProduct(data: any): Observable<ProductModel> {
    return this.http.post<ProductModel>('http://localhost:8061/basket_prod', data);
  }
}
