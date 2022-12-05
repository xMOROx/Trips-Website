import { Component, OnInit } from '@angular/core';
import { Trip } from '../Models/trip';
import { BoughtTripsService } from '../services/boughtTrips.service';

@Component({
  selector: 'app-buyHistory',
  templateUrl: './buyHistory.component.html',
  styleUrls: ['./buyHistory.component.css']
})
export class BuyHistoryComponent implements OnInit {

  public boughtTrips: Trip[] = [];

  constructor(private boughtTripsService: BoughtTripsService) { }

  ngOnInit() {
    this.boughtTripsService.getBoughtTrips().subscribe(trip => {
      this.boughtTrips = trip;
    });
  }

}
