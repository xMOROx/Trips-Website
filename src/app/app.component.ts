import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Trip } from './Models/trip';
import { User } from './Models/User';
import { AuthService } from './services/auth.service';
import { BoughtTripsService } from './services/boughtTrips.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wycieczki';
  user!: any;
  constructor
    (
      private router: Router,
      private authService: AuthService,
      private boughtTripsService: BoughtTripsService,
    ) { }

  ngOnInit() {

    this.boughtTripsService.tripsObservable().pipe(filter((res: any) => res)).subscribe((trips: Trip[]) => {
      for (const trip of trips) {
        this.boughtTripsService.setStatus(trip);
        this.boughtTripsService.updateTripByValue(trip, { status: trip.status });
        if (!trip.getNotification) {
          this.boughtTripsService.sendReminderNotification(trip);
        }
      }
    });
  }
}

