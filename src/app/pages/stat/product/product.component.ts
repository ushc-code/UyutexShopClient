import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../../catalog/state/product.service';
import {BasketService} from '../../basket/state/basket.service';
import {ProductModel} from '../../../models/product.model';
import {StatService} from '../state/stat.service';
import {StatQuery} from '../state/stat.query';
import {StatsModel} from '../../../models/stats.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  constructor(private statService: StatService, private statQuery: StatQuery) {
  }

  @Input() post: StatsModel;

  ngOnInit(): void {
  }

  delete(): void {
    this.statService.delete(this.post.product.id);
    console.log('Удален продукт ' + this.post.id);
  }
}
