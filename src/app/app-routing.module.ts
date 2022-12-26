import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './authentication/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { AdminGuard } from './authentication/guard/admin.guard';
import { AuthGuard } from './authentication/guard/auth.guard';
import { CanReadGuard } from './authentication/guard/can-read.guard';
import { LoggedGuard } from './authentication/guard/logged.guard';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';
import { BuyHistoryComponent } from './buyHistory/buyHistory.component';
import { HomePageComponent } from './layout/home-page/home-page.component';
import { AdminPanelComponent } from './page-administration/admin-panel/admin-panel.component';
import { AnalyticsComponent } from './page-administration/admin-panel/Analytics/Analytics.component';
import { ListUsersComponent } from './page-administration/admin-panel/users/list-users/list-users.component';
import { PageSettingsComponent } from './page-administration/pageSettings/pageSettings.component';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { TripsCartComponent } from './trips-cart/trips-cart.component';
import { ManageTripsComponent } from './trips/manage-trips/manage-trips.component';
import { SingleTripComponent } from './trips/singleTrip/singleTrip.component';
import { ListTripsComponent } from './trips/trip-display/list-trips/list-trips.component';

const routes: Routes = [
  { path: 'cart', component: TripsCartComponent, canActivate: [AuthGuard, CanReadGuard] },
  { path: 'manage', component: ManageTripsComponent, canActivate: [AuthGuard, AdminGuard] },
  {
    path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard, AdminGuard],
    children:
      [
        { path: 'analytics', component: AnalyticsComponent, pathMatch: 'full', canActivate: [AuthGuard, AdminGuard] },
        { path: 'users', component: ListUsersComponent, pathMatch: 'full', canActivate: [AuthGuard, AdminGuard] },
      ]
  },
  { path: 'trips', component: ListTripsComponent },
  { path: 'trips/:key', component: SingleTripComponent, canActivate: [AuthGuard, CanReadGuard] },
  { path: 'buyHistory', component: BuyHistoryComponent, canActivate: [AuthGuard, CanReadGuard] },
  { path: 'settings', component: PageSettingsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, CanReadGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [LoggedGuard] },
  { path: 'register-user', component: SignUpComponent, canActivate: [LoggedGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [LoggedGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [LoggedGuard] },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomePageComponent },
  { path: "**", component: PageNotFoundComponent }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      scrollOffset: [0, 0],
      anchorScrolling: "enabled",
      scrollPositionRestoration: "enabled",
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }