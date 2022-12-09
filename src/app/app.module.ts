import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TripsModule } from './trips/trips.module';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';


import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TripsCartComponent } from './trips-cart/trips-cart.component';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { FooterComponent } from './footer/footer.component';
import { NotificationComponent } from './notification/notification.component';
import { BuyHistoryComponent } from './buyHistory/buyHistory.component';

import { FiltersService } from './services/filters.service';

import { DatePipe } from '@angular/common';
import { StatusPipe } from './pipes/filters/status.pipe';
import { environment } from 'src/environments/environment';
import { PageSettingsComponent } from './pageSettings/pageSettings.component';

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
    StatusPipe,
    PageSettingsComponent
  ],
  imports: [
    BrowserModule,
    TripsModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    GoogleMapsModule,
    DatePipe,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    FiltersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
