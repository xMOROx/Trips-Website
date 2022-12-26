import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { BoughtTripsService } from './services/boughtTrips.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wycieczki';
  constructor
    (
      private router: Router,
      private authService: AuthService,
      private boughtTripsService: BoughtTripsService,
    ) { }

  ngOnInit() {
    if (localStorage.getItem('user') !== 'null') {
      this.boughtTripsService.getBoughtTrips().subscribe(trips => {
        trips.forEach(trip => {
          this.boughtTripsService.setStatus(trip);
          this.boughtTripsService.updateTripByValue(trip, { status: trip.status });
          if (!trip.getNotification) {
            this.boughtTripsService.sendReminderNotification(trip);
          }
        });
      });
    }
    // this.router.navigate(['/home']);
  }
}

