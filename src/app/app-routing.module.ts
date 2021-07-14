import {NgModule} from '@angular/core';

import {Routes, RouterModule} from '@angular/router';
import {ErrorComponent} from './pages/error/error.component';
import {AdminGuard} from './guard/admin.guard';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },

  {path: '', redirectTo: 'pages/homepage', pathMatch: 'full'},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
