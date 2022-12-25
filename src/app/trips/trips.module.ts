import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from '../app-routing.module';
import { ImageSliderModule } from '../imageSlider/imageSlider/imageSlider.module';

import { FiltersComponent } from '../filters/filters.component';
import { TripsParseService } from '../services/tripsParse.service';
import { ManageTripsComponent } from './manage-trips/manage-trips.component';
import { ModifyFormComponent } from './modifyForm/modifyForm.component';
import { SingleTripComponent } from './singleTrip/singleTrip.component';
import { DetailTripComponent } from './trip-display/detail-trip/detail-trip.component';
import { ListTripsComponent } from './trip-display/list-trips/list-trips.component';
import { TripRatingComponent } from './trip-rating/trip-rating.component';

import { NameValidatorDirective } from '../name-validator.directive';

import { DatePipe } from '../pipes/filters/date.pipe';
import { DestinationCountryPipe } from '../pipes/filters/destinationCountry.pipe';
import { PricePipe } from '../pipes/filters/price.pipe';
import { StarsPipe } from '../pipes/filters/stars.pipe';
import { NotificationsService } from '../services/notifications.service';
import { SettingsChangeService } from '../services/settingsChange.service';

@NgModule({
  declarations: [
    DatePipe,
    PricePipe,
    StarsPipe,
    FiltersComponent,
    ListTripsComponent,
    DetailTripComponent,
    TripRatingComponent,
    SingleTripComponent,
    ModifyFormComponent,
    ManageTripsComponent,
    NameValidatorDirective,
    DestinationCountryPipe,
  ],
  entryComponents: [
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatDialogModule,
    HttpClientModule,
    AppRoutingModule,
    ImageSliderModule,
    FontAwesomeModule,
  ],
  exports: [
    ListTripsComponent,
    DetailTripComponent,
    TripRatingComponent,
    ManageTripsComponent,
    NameValidatorDirective
  ],
  providers: [
    TripsParseService,
    NotificationsService,
    SettingsChangeService
  ]
})
export class TripsModule { }
