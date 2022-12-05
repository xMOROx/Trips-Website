import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Trip } from '../Models/trip';

@Injectable({
  providedIn: 'root'
})
export class BoughtTripsService {

  private boughtTrips: Trip[] = [];
  private boughtTripHandler: BehaviorSubject<Trip[]> = new BehaviorSubject<Trip[]>(this.boughtTrips);
  constructor() { }

  public addTrip(trip: Trip): void {
    this.boughtTrips.push(trip);
    this.boughtTripHandler.next(this.boughtTrips);
  }

  public getBoughtTrips(): Observable<Trip[]> {
    return this.boughtTripHandler.asObservable();
  }

}
