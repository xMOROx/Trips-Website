import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomePageComponent } from './layout/home-page/home-page.component';
import { ListTripsComponent } from './trips/trip-display/list-trips/list-trips.component';
import { ManageTripsComponent } from './trips/manage-trips/manage-trips.component';
import { TripsCartComponent } from './trips-cart/trips-cart.component';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { SingleTripComponent } from './trips/singleTrip/singleTrip.component';
import { BuyHistoryComponent } from './buyHistory/buyHistory.component';
import { PageSettingsComponent } from './page-administration/pageSettings/pageSettings.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { DashboardComponent } from './authentication/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';
import { AuthGuard } from './authentication/guard/auth.guard';
import { AdminGuard } from './authentication/guard/admin.guard';
import { CanReadGuard } from './authentication/guard/can-read.guard';
import { AdminPanelComponent } from './page-administration/admin-panel/admin-panel.component';

const routes: Routes = [
  { path: 'cart', component: TripsCartComponent, canActivate: [AuthGuard, CanReadGuard] },
  { path: 'manage', component: ManageTripsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'trips', component: ListTripsComponent },
  { path: 'trips/:key', component: SingleTripComponent, canActivate: [AuthGuard, CanReadGuard] },
  { path: 'buyHistory', component: BuyHistoryComponent, canActivate: [AuthGuard, CanReadGuard] },
  { path: 'settings', component: PageSettingsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, CanReadGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
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