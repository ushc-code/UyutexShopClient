import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {PagesComponent} from './pages-component';
import {HomepageComponent} from './homepage/homepage.component';
import {CatalogComponent} from './catalog/catalog.component';
import {StatComponent} from './stat/stat.component';
import {BasketComponent} from './basket/basket.component';
import {PersonComponent} from './person/person.component';
import {NbLoginComponent} from '@nebular/auth';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AdminGuard} from '../guard/admin.guard';
import {UserGuard} from '../guard/user.guard';



export const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'homepage',
      component : HomepageComponent,
    },
    {
      path: 'catalog',
      component : CatalogComponent,
    },
    {
      path: 'stat',
      component : StatComponent,
      canActivate : [AdminGuard],
      canLoad : [AdminGuard],
    },
    {
      path: 'basket',
      component : BasketComponent,
      canActivate : [UserGuard]
    },
    {
      path: 'person',
      component: PersonComponent,
      canActivate : [UserGuard]
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserGuard, AdminGuard],
})
export class PagesRoutingModule {
}
