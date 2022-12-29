import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faClock, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs/operators';
import { Trip } from '../Models/trip';
import { TripStatus } from '../Models/tripStatus.enum';
import { BoughtTripsService } from '../services/boughtTrips.service';
import { SettingsChangeService } from '../services/settingsChange.service';
@Component({
  selector: 'app-buyHistory',
  templateUrl: './buyHistory.component.html',
  styleUrls: ['./buyHistory.component.css']
})
export class BuyHistoryComponent implements OnInit {

  public boughtTrips: Trip[] = [];
  public currency!: string;
  public faClock: IconDefinition = faClock;
  public selectedValue: TripStatus[] = [];
  public statusType: typeof TripStatus = TripStatus;
  constructor
    (
      private boughtTripsService: BoughtTripsService,
      private titleService: Title,
      private settings: SettingsChangeService
    ) { }

  ngOnInit() {
    this.titleService.setTitle("Historia zakupow")
    this.boughtTripsService.tripsObservable().pipe(filter((res: any) => res)).subscribe(trips => {
      console.log(trips);

      this.boughtTrips = trips;
    });
    this.settings.getCurrency().subscribe(currency => {
      this.currency = currency.value;
    });
  }
}
