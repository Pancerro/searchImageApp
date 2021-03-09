import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StarterPageComponent} from './component/starter-page/starter-page.component';
import {SearchResultPageComponent} from './component/search-result-page/search-result-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/starter-page', pathMatch: 'full' },
  { path: 'starter-page', component: StarterPageComponent},
  { path: 'search-result-page/:searchKeyword', component: SearchResultPageComponent},
  { path: '**', redirectTo: '/starter-page' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
