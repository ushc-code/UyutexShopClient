import {Component, Input, OnInit} from '@angular/core';
import {StatService} from '../state/stat.service';
import {StatQuery} from '../state/stat.query';
import {StatsModel} from '../../../models/stats.model';
import {BasketService} from '../../basket/state/basket.service';

@Component({
  selector: 'app-by-count-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ByCountProductComponent implements OnInit {
  constructor(private statService: StatService, private statQuery: StatQuery, private basketService: BasketService) {
  }

  @Input() post: StatsModel;

  ngOnInit(): void {
  }

  delete(): void {
    this.statService.delete(this.post.product.id);
    console.log('Удален продукт ' + this.post.id);
  }
}
