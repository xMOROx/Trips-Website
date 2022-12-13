import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomePageComponent } from './home-page/home-page.component';
import { ListTripsComponent } from './trips/list-trips/list-trips.component';
import { TripAddComponent } from './trips/trip-add/trip-add.component';
import { TripsCartComponent } from './trips-cart/trips-cart.component';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { SingleTripComponent } from './trips/singleTrip/singleTrip.component';
import { BuyHistoryComponent } from './buyHistory/buyHistory.component';
import { PageSettingsComponent } from './pageSettings/pageSettings.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { DashboardComponent } from './authentication/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';

const routes: Routes = [
  { path: 'tripAdd', component: TripAddComponent },
  { path: 'cart', component: TripsCartComponent },
  { path: 'trips', component: ListTripsComponent },
  { path: 'trips/:key', component: SingleTripComponent },
  { path: 'buyHistory', component: BuyHistoryComponent },
  { path: 'settings', component: PageSettingsComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: '', component: HomePageComponent },
  { path: "**", component: PageNotFoundComponent }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      scrollOffset: [0, 0],
      anchorScrolling: "enabled",
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }