import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {OrderService} from './state/order.service';
import {OrderQuery} from './state/order.query';
import {OrderModel} from '../../models/order.model';
import {UserQuery} from '../login/state/user.query';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers: [DatePipe]
})
export class PersonComponent implements OnInit {
  orders: OrderModel[];
  isOrdersLoad = false;
  isUserLogged = false;
  isAminLogged = false;

  constructor(private orderService: OrderService,
              private orderQuery: OrderQuery,
              private userQuery: UserQuery) {
    if (this.userQuery.getLoggedUser() !== null) {
      this.orderService.loadOrders().subscribe(res => {
        this.orders = this.orderQuery.getAll();
        console.log('Хранилище заказов');
        console.log(this.orders);
        this.isOrdersLoad = true;

        this.loadOrders();
        this.isOrdersLoad = true;
        this.isUserLogged = !this.userQuery.isAdmin();
        this.isAminLogged = this.userQuery.isAdmin();
      });
    }
  }

  ngOnInit(): void {
    if (this.userQuery.getLoggedUser() !== null) {
      this.loadOrders();
      this.isOrdersLoad = true;
    }
  }

  loadOrders(): void {
    this.orderService.loadOrders().subscribe(res => {
      this.orders = this.orderQuery.getAll();
      console.log('Хранилище заказов');
      console.log(this.orders);
      this.isOrdersLoad = true;
    });
  }
}
