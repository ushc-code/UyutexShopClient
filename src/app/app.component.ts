import { Component } from '@angular/core';
import {TABS_ROUTES} from './pages/pages-menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'uytex';
  tabs = TABS_ROUTES;

}
