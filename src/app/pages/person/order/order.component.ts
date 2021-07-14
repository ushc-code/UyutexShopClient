import {Component, Input, OnInit} from '@angular/core';
import {OrderModel} from '../../../models/order.model';
import {OrderService} from '../state/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  constructor(private orderService: OrderService, /*private basketService: Service*/) {
  }

  @Input() post: OrderModel;

  ngOnInit(): void {
  }

}
