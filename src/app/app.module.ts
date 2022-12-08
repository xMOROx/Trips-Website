import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TripsModule } from './trips/trips.module';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps'


import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TripsCartComponent } from './trips-cart/trips-cart.component';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { FooterComponent } from './footer/footer.component';
import { NotificationComponent } from './notification/notification.component';
import { BuyHistoryComponent } from './buyHistory/buyHistory.component';

import { CartService } from './services/cart.service';
import { CurrenciesService } from './services/currencies.service';
import { FiltersService } from './services/filters.service';

import { DatePipe } from '@angular/common';
import { StatusPipe } from './pipes/filters/status.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomePageComponent,
    TripsCartComponent,
    PageNotFoundComponent,
    FooterComponent,
    NotificationComponent,
    BuyHistoryComponent,
    StatusPipe
  ],
  imports: [
    BrowserModule,
    TripsModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    GoogleMapsModule,
    DatePipe,

  ],
  providers: [
    CartService,
    CurrenciesService,
    FiltersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
