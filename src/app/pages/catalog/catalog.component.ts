import {Component, OnInit} from '@angular/core';
import {ProductQuery} from './state/product.query';
import {ProductService} from './state/product.service';
import {ProductModel} from '../../models/product.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit {

  products: ProductModel[];
  isProductsLoad = false;

  constructor(private productQuery: ProductQuery, private productService: ProductService) {
    this.productService.load().subscribe(load => {
      this.loadProducts();
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    if (this.productQuery.hasEntity()) {
      this.isProductsLoad = true;
      this.products = this.productQuery.getAll();
    } else {
      this.isProductsLoad = false;
    }
  }

}
