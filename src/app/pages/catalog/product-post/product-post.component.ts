import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../state/product.service';
import {ProductModel} from '../../../models/product.model';
import {BasketService} from '../../basket/state/basket.service';

@Component({
  selector: 'app-product-post',
  templateUrl: './product-post.component.html',
  styleUrls: ['./product-post.component.css']
})
export class ProductPostComponent implements OnInit {
  constructor(private productService: ProductService, private basketService: BasketService) {
  }

  @Input() post: ProductModel;
  buy(): void {
    this.basketService.addProduct(this.post);
    console.log('Куплен продукт ' + this.post.id);
  }

  ngOnInit(): void {
  }

}
