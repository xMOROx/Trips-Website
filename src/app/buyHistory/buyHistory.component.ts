import { Component, OnInit } from '@angular/core';
import { Trip } from '../Models/trip';
import { BoughtTripsService } from '../services/boughtTrips.service';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { TripStatus } from '../Models/tripStatus.enum';




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
  constructor(private boughtTripsService: BoughtTripsService, private titleService: Title) { }



  ngOnInit() {
    this.titleService.setTitle("Historia zakupow")
    this.boughtTripsService.getBoughtTrips().subscribe(trips => {
      this.boughtTrips = trips;
    });

  }

}
