import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { ImageSliderModule } from '../imageSlider/imageSlider/imageSlider.module';
import { MatDialogModule } from '@angular/material/dialog';

import { ListTripsComponent } from './list-trips/list-trips.component';
import { DetailTripComponent } from './detail-trip/detail-trip.component';
import { TripRatingComponent } from './trip-rating/trip-rating.component';
import { TripsParseService } from '../services/tripsParse.service';
import { ManageTripsComponent } from './manage-trips/manage-trips.component';
import { FiltersComponent } from '../filters/filters.component';
import { SingleTripComponent } from './singleTrip/singleTrip.component';
import { ModifyFormComponent } from './modifyForm/modifyForm.component';

import { NameValidatorDirective } from '../name-validator.directive';

import { DestinationCountryPipe } from '../pipes/filters/destinationCountry.pipe';
import { PricePipe } from '../pipes/filters/price.pipe';
import { DatePipe } from '../pipes/filters/date.pipe';
import { StarsPipe } from '../pipes/filters/stars.pipe';
import { NotificationsService } from '../services/notifications.service';
import { SettingsChangeService } from '../services/settingsChange.service';

@NgModule({
  declarations: [
    ListTripsComponent,
    DetailTripComponent,
    TripRatingComponent,
    FiltersComponent,
    SingleTripComponent,
    ModifyFormComponent,
    ManageTripsComponent,
    NameValidatorDirective,
    DestinationCountryPipe,
    PricePipe,
    DatePipe,
    StarsPipe

  ],
  entryComponents: [
  ],
  imports: [
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ImageSliderModule,
    MatDialogModule,
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
