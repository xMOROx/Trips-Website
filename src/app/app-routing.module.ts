import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomePageComponent } from './home-page/home-page.component';
import { ListTripsComponent } from './trips/list-trips/list-trips.component';
import { TripAddComponent } from './trips/trip-add/trip-add.component';
import { TripsCartComponent } from './trips-cart/trips-cart.component';
import { FiltersComponent } from './filters/filters.component';

const routes: Routes = [
  { path: 'trips', component: ListTripsComponent },
  { path: '', component: HomePageComponent },
  { path: 'tripAdd', component: TripAddComponent },
  { path: 'cart', component: TripsCartComponent },
  { path: 'filter', component: FiltersComponent }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }