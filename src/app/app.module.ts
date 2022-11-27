import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TripsModule } from './trips/trips.module';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TripsCartComponent } from './trips-cart/trips-cart.component';

import { CartService } from './services/cart.service';
import { CurrenciesService } from './services/currencies.service';
import { FiltersService } from './services/filters.service';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomePageComponent,
    TripsCartComponent,
  ],
  imports: [
    BrowserModule,
    TripsModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [
    CartService,
    CurrenciesService,
    FiltersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
