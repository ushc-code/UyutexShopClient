import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {HomepageComponent} from './homepage/homepage.component';
import {PagesComponent} from './pages-component';
import {PagesRoutingModule} from './pages-routing.module';
import {NbAlertModule, NbButtonModule, NbCheckboxModule, NbIconModule, NbInputModule, NbLayoutModule, NbThemeModule} from '@nebular/theme';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductPostComponent} from './catalog/product-post/product-post.component';
import {ProductComponent} from './stat/product/product.component';
import {BasketPostComponent} from './basket/basket-post/basket-post.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProductService} from './catalog/state/product.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BasketService} from './basket/state/basket.service';
import {OrderService} from './person/state/order.service';
import {PersonComponent} from './person/person.component';
import {OrderComponent} from './person/order/order.component';
import {AdminOrderComponent} from './person/admin-order/admin-order.component';
import {StatService} from './stat/state/stat.service';
import {ByCountProductComponent} from './stat/product-by-count/by-count-product.component';



@NgModule({
  declarations: [
    HomepageComponent,
    PagesComponent,
    ProductPostComponent,
    ProductComponent,
    BasketPostComponent,
    LoginComponent,
    RegisterComponent,
    PersonComponent,
    OrderComponent,
    AdminOrderComponent,
    ByCountProductComponent
  ],
  exports: [
    ProductPostComponent,
    ProductComponent,
    BasketPostComponent,
    OrderComponent,
    ByCountProductComponent
  ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        NbLayoutModule,
        NgbCarouselModule,
        NbIconModule,
        NbButtonModule,
        NbInputModule,
        NbAlertModule,
        FormsModule,
        NbCheckboxModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
  providers: [
    ProductService,
    BasketService,
    OrderService,
    StatService,
    DatePipe
  ]
})
export class PagesModule {
}
