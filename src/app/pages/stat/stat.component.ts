import {Component, OnInit} from '@angular/core';
import {StatService} from './state/stat.service';
import {ProductModel} from '../../models/product.model';
import {StatQuery} from './state/stat.query';
import {StatsModel} from '../../models/stats.model';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
  productsByCount: StatsModel[];
  productsByWorth: StatsModel[];
  isProductsLoad = false;
  sortType = 'ByCount';

  constructor(private statService: StatService, private statQuery: StatQuery) {
    this.statService.load(this.sortType).subscribe(() => {
      this.sortProducts();
    });
  }

  ngOnInit(): void {
    this.sortProducts();
  }

  /*loadProducts(): void {
    if (this.statQuery.hasEntity()) {
      this.isProductsLoad = true;
      this.products = this.statQuery.getAll();
    } else {
      this.isProductsLoad = false;
    }
  }
*/
  sortProducts(): void {
    if (this.statQuery.hasEntity()) {
      this.isProductsLoad = true;
      this.productsByCount = this.statQuery.getAll();
      this.productsByWorth = this.statQuery.getAll();
      if (this.isSortByCount()) {
        this.productsByCount.sort(
          (a: StatsModel, b: StatsModel) => {
            if (a.count > b.count) {
              return -1;
            } else if (a.count < b.count) {
              return 1;
            } else {
              return 0;
            }
          }
        );
      }
      if (this.isSortByWorth()) {
        this.productsByWorth.sort(
          (a: StatsModel, b: StatsModel) => {
            if (a.product.cost < b.product.cost) {
              return -1;
            } else if (a.product.cost > b.product.cost) {
              return 1;
            } else {
              return 0;
            }
          }
        );
      }
    } else {
      this.isProductsLoad = false;
    }
  }

  setSortByCount(): void {
    this.sortType = 'ByCount';
  }

  setSortByWorth(): void {
    this.sortType = 'ByWorth';
  }

  isSortByCount(): boolean {
    return this.sortType === 'ByCount';
  }

  isSortByWorth(): boolean {
    return this.sortType === 'ByWorth';
  }
}
