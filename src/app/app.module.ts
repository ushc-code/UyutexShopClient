import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbTabsetModule,
  NbRouteTabsetModule,
  NbActionsModule,
  NbSidebarModule,
  NbButtonModule, NbCheckboxModule, NbInputModule, NbAlertModule, NbListModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CatalogComponent} from './pages/catalog/catalog.component';
import {StatComponent} from './pages/stat/stat.component';
import {BasketComponent} from './pages/basket/basket.component';
import {PersonComponent} from './pages/person/person.component';
import {PagesModule} from './pages/pages.module';
import {ErrorComponent} from './pages/error/error.component';

import {FormsModule} from '@angular/forms';
import {environment} from '../environments/environment';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    StatComponent,
    BasketComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbEvaIconsModule,
    AppRoutingModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbActionsModule,
    NbSidebarModule,
    NgbModule,
    PagesModule,
    NbButtonModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    NbCheckboxModule,
    NbInputModule,
    NbAlertModule,
    FormsModule,
    NbListModule,
    AkitaNgRouterStoreModule,
  ],
  providers: [{ provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
