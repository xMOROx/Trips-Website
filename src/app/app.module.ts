import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TripsModule } from './trips/trips.module';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppComponent } from './app.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { HomePageComponent } from './layout/home-page/home-page.component';
import { TripsCartComponent } from './trips-cart/trips-cart.component';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NotificationComponent } from './layout/notification/notification.component';
import { BuyHistoryComponent } from './buyHistory/buyHistory.component';

import { FiltersService } from './services/filters.service';

import { DatePipe } from '@angular/common';
import { StatusPipe } from './pipes/filters/status.pipe';
import { environment } from 'src/environments/environment';
import { PageSettingsComponent } from './page-administration/pageSettings/pageSettings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { DashboardComponent } from './authentication/dashboard/dashboard.component';
import { AdminGuard } from './authentication/guard/admin.guard';
import { AuthGuard } from './authentication/guard/auth.guard';
import { CanReadGuard } from './authentication/guard/can-read.guard';
import { ManageTripsComponent } from './trips/manage-trips/manage-trips.component';
import { AdminPanelComponent } from './page-administration/admin-panel/admin-panel.component';

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
    PageSettingsComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    AdminPanelComponent,
    StatusPipe,

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
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    AngularFireAuthModule
  ],
  providers: [
    FiltersService,
    AuthService,
    AdminGuard,
    AuthGuard,
    CanReadGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
