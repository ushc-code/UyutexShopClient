import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {ProductModel} from '../../models/product.model';
import {ProductQuery} from '../catalog/state/product.query';
import {ProductService} from '../catalog/state/product.service';
import {BasketQuery} from './state/basket.query';
import {BasketService} from './state/basket.service';
import {UserQuery} from '../login/state/user.query';
import {formatNumber} from '@angular/common';
import {Observable} from 'rxjs';
import {OrderService} from '../person/state/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  products: ProductModel[];
  isFirstLoad: boolean;
  isProductsLoad = false;
  totalPrice = 0;
  formattedTotalPrice = '0';

  constructor(@Inject(LOCALE_ID) private locale: string,
              private basketQuery: BasketQuery,
              private basketService: BasketService,
              private productQuery: ProductQuery,
              private orderService: OrderService,
              private userQuery: UserQuery,
              private router: Router) {
    if (this.userQuery.getLoggedUser() !== null) {
      this.basketService.load().subscribe(load => {
        this.isFirstLoad = true;
        this.isFirstLoad = false;
        console.log('Хранилище корзины');
        console.log(this.basketQuery.getAll());
      });
    }
  }

  ngOnInit(): void {
    if (!this.isFirstLoad) {
      if (this.userQuery.getLoggedUser() !== null) {
        this.basketService.load().subscribe(load => {
          this.loadProducts();
          console.log('Хранилище корзины');
          console.log(this.basketQuery.getAll());
        });
      }
    }
  }

  loadProducts(): void {
    if (this.basketQuery.hasEntity()) {
      this.totalPrice = 0;
      this.isProductsLoad = true;
      this.products = this.basketQuery.getAll();
      this.countTotalPrice();
    } else {
      this.isProductsLoad = false;
    }
  }

  countTotalPrice(): void {
    this.products.map(prods => {
      this.totalPrice = 0;
      this.formattedTotalPrice = '0';
      this.basketService.getIdBasket().subscribe(res => {
          this.basketService.getProductCount(prods.id, res.valueOf()).subscribe(resp => {
            this.totalPrice += prods.cost * resp.valueOf();
            this.formattedTotalPrice = formatNumber(this.totalPrice, this.locale, '1.2-2');
            this.formattedTotalPrice = this.formattedTotalPrice.replace(/,/g, ' ');
          });
        }
      );
    });
  }

  order(): void {
    this.orderService.order(this.formattedTotalPrice.replace(/ /g, ''));
  }
}
