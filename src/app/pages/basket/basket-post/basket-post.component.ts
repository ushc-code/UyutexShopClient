import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProductModel} from '../../../models/product.model';
import {BasketService} from '../state/basket.service';
import {UserQuery} from '../../login/state/user.query';
import {Router} from '@angular/router';
import {BasketQuery} from '../state/basket.query';
import {BasketComponent} from '../basket.component';

@Component({
  selector: 'app-basket-post',
  templateUrl: './basket-post.component.html',
  styleUrls: ['./basket-post.component.css']
})
export class BasketPostComponent implements OnInit {
  totalCount = 1;
  idBasket: number;
  @Input() post: ProductModel;
  isShow = true;

  /*@Input() products: ProductModel[];*/

  constructor(private basketService: BasketService,
              private userQuery: UserQuery,
              private router: Router,
              private basketQuery: BasketQuery,
              private basketComponent: BasketComponent) {
    if (userQuery.isLoggedIn()) {
      this.basketService.getIdBasket().subscribe(res => {
        this.idBasket = res;
        this.basketService.getProductCount(this.post.id, this.idBasket).subscribe(resp => {
          this.totalCount = resp;
        });
      });
    }
  }

  ngOnInit(): void {
    if (this.userQuery.isLoggedIn()) {
      this.basketService.getIdBasket().subscribe(res => {
        this.idBasket = res;
        if (this.isShow) {
          this.basketService.getProductCount(this.post.id, this.idBasket).subscribe(resp => {
            this.totalCount = resp;
            console.log(resp);
          });
        }
      });
    }
  }

  send(): void {
    if (this.userQuery.isLoggedIn()) {
      this.basketService.getIdBasket().subscribe(res => {
        this.idBasket = res;
        this.basketService.setProductCount(this.post.id, this.idBasket, this.totalCount);
        this.basketComponent.countTotalPrice();
      });
    }
  }

  increment(): void {
    this.totalCount++;
  }

  decrement(): void {
    this.totalCount--;
  }

  delete(): void {
    if (this.userQuery.isLoggedIn()) {
      this.basketService.getIdBasket().subscribe(res => {
        this.basketQuery.selectEntity(this.post);
        this.idBasket = res;
        this.basketService.deleteProduct(this.post.id, this.idBasket, this.totalCount);
        this.basketService.load();
        this.isShow = false;
        /*this.products[this.products.indexOf(this.post)]=;
        this.router.navigate(['./pages/basket']);*/
      });
    }
  }
}
