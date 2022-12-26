import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { TripsModule } from './trips/trips.module';

import { AppComponent } from './app.component';
import { BuyHistoryComponent } from './buyHistory/buyHistory.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomePageComponent } from './layout/home-page/home-page.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { NotificationComponent } from './layout/notification/notification.component';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { TripsCartComponent } from './trips-cart/trips-cart.component';

import { FiltersService } from './services/filters.service';

import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './authentication/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { AdminGuard } from './authentication/guard/admin.guard';
import { AuthGuard } from './authentication/guard/auth.guard';
import { CanReadGuard } from './authentication/guard/can-read.guard';
import { LoggedGuard } from './authentication/guard/logged.guard';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';
import { ClickOutsideDirective } from './layout/nav-bar/ClickOutside.directive';
import { AdminPanelComponent } from './page-administration/admin-panel/admin-panel.component';
import { AnalyticsComponent } from './page-administration/admin-panel/Analytics/Analytics.component';
import { EditFormComponent } from './page-administration/admin-panel/users/editForm/editForm.component';
import { ListUsersComponent } from './page-administration/admin-panel/users/list-users/list-users.component';
import { PageSettingsComponent } from './page-administration/pageSettings/pageSettings.component';
import { StatusPipe } from './pipes/filters/status.pipe';
import { AdminUsersService } from './services/adminUsers.service';
import { AuthService } from './services/auth.service';

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
    AnalyticsComponent,
    ListUsersComponent,
    EditFormComponent,
    StatusPipe,
    ClickOutsideDirective

  ],
  imports: [
    DatePipe,
    FormsModule,
    TripsModule,
    BrowserModule,
    GoogleMapsModule,
    AppRoutingModule,
    FontAwesomeModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [
    AuthService,
    FiltersService,
    AdminUsersService,
    AuthGuard,
    AdminGuard,
    LoggedGuard,
    CanReadGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
