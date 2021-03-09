import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StarterPageComponent } from './component/starter-page/starter-page.component';
import { SearchResultPageComponent } from './component/search-result-page/search-result-page.component';
import { ModalBigImageComponent } from './share/modal-big-image/modal-big-image.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SearchComponent} from './share/search/search.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { ClickOutsideDirective } from './share/directive/click-outside.directive';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    StarterPageComponent,
    SearchResultPageComponent,
    ModalBigImageComponent,
    SearchComponent,
    ClickOutsideDirective,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        FontAwesomeModule,
        InfiniteScrollModule
    ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
