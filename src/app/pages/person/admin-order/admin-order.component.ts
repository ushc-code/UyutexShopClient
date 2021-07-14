import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../state/order.service';
import {OrderModel} from '../../../models/order.model';
import {OrderStore} from '../state/order.store';
import {OrderQuery} from '../state/order.query';
import {PersonComponent} from '../person.component';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {
  status: '';
  isInit = false;
  constructor(private orderService: OrderService,
              private orderStore: OrderStore,
              private orderQuery: OrderQuery,
              private personComponent: PersonComponent) {
  }
  @Input() post: OrderModel;

  ngOnInit(): void {
    status = this.post.status.valueOf();
    this.isInit = true;
  }
  changeStatus(text: string): void {
    status = text;
  }
  updateStatus(): void {
    this.orderService.updateOrder(this.orderQuery.getEntity(this.post.id_order), status.valueOf());
  }
}
