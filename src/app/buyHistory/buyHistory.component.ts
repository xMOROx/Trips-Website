import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faClock } from '@fortawesome/free-solid-svg-icons';
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
  public faClock: any = faClock;
  public statusType: typeof TripStatus = TripStatus;
  public selectedValue: TripStatus[] = [];
  public currency!: string;
  constructor(private boughtTripsService: BoughtTripsService, private titleService: Title, private settings: SettingsChangeService) { }



  ngOnInit() {
    this.titleService.setTitle("Historia zakupow")
    this.boughtTripsService.getBoughtTrips().subscribe(trips => {
      this.boughtTrips = trips;
    });
    this.settings.getCurrency().subscribe(currency => {
      this.currency = currency.value;
    });
  }

}
