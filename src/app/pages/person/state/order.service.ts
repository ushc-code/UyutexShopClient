import {Injectable} from '@angular/core';
import {OrderStore} from './order.store';
import {OrderQuery} from './order.query';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {ID} from '@datorama/akita';
import {UserQuery} from '../../login/state/user.query';
import {tap} from 'rxjs/operators';
import {OrderModel} from '../../../models/order.model';
import {PersonComponent} from '../person.component';

@Injectable(
)
export class OrderService {
  constructor(private orderStore: OrderStore,
              private orderQuery: OrderQuery,
              private http: HttpClient,
              private userQuery: UserQuery,
              private datePipe: DatePipe) {
  }

  private basketId: number;
  private curDate: string;
  private status: string;
  private idOrder: ID;

  getIdBasket(): Observable<number> {
    return this.http.get<number>('http://localhost:8061/basket' + '?userId=' + this.userQuery.getLoggedUser().id);
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    return this.datePipe.transform(currentDate, 'yyyy-MM-dd');
  }

  /*load(): Observable<OrderModel[]> {
    return this.loadOrders().subscribe(res =>{});
  }*/

  loadOrders(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>('http://localhost:8061/orders').pipe(
      tap(orders => {
        // this.orderStore.reset();
        this.getIdBasket().subscribe(res => {
          orders.map(order => {
            if (this.userQuery.isAdmin()) {
              this.orderStore.add(order);
              console.log('Айдишник заказа');
              console.log(order.id_basket);
              console.log('Заказ');
              console.log(order);
            } else {
              if (order.id_basket.valueOf() === res.valueOf()) {
                this.orderStore.add(order);
                console.log('Айдишник заказа');
                console.log(order.id_basket);
                console.log('Заказ');
                console.log(order);
                console.log('Текущие сущности в хранилище');
                console.log(this.orderQuery.getAll());
              }
            }
          });
        });
      })
    );
  }

  order(totalPrice: string): void {
    this.getIdBasket().subscribe(res => {
      this.status = 'Собирается';
      this.basketId = res.valueOf();
      this.curDate = this.getCurrentDate().valueOf().toString();
      this.http.post('http://localhost:8061/orders', {
        id_order: null,
        id_basket: this.basketId,
        status: this.status,
        order_date: this.curDate,
        price_order: totalPrice
      }).subscribe(
        a => {
          console.log('Заказ отправлен');
        }
      );
    });
  }
  updateOrder(order: OrderModel, newStatus: string): void{
    this.http.post('http://localhost:8061/orders' + '?id=' + order.id_order, {
      id_order: order.id_order,
      id_basket: order.id_basket,
      status: newStatus,
      date: order.date,
      price_order: order.price_order,
    }).subscribe(() => {
    });
  }
}
