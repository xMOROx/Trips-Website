import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Trip } from '../Models/trip';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReservedTripsForUserService {

  private subjectAmount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private subjectPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private reservedTripsForUser: Trip[] = [];
  private handleReservedTripsForUser: BehaviorSubject<Trip[]> = new BehaviorSubject<Trip[]>(this.reservedTripsForUser);

  constructor(public auth: AuthService) { }

  public getReservedTripsForUser(): Observable<Trip[]> {
    return this.handleReservedTripsForUser.asObservable();
  }

  private findTripWithKey(trip: Trip): Trip | undefined {
    return this.reservedTripsForUser.find((tripFromList: Trip) => {
      return tripFromList.key === trip.key;
    });
  }

  private removeTripWithKey(trip: Trip): void {
    this.reservedTripsForUser = this.reservedTripsForUser.filter((tripFromList: Trip) => {
      return tripFromList.key !== trip.key;
    });
  }

  public setReservedTripsForUser(trip: Trip): void {
    const tripFromList: Trip | undefined = this.findTripWithKey(trip);
    if (tripFromList) {
      this.removeTripWithKey(trip);
    }

    if (trip.amount > 0) {
      this.reservedTripsForUser.push(trip);
    }
    this.handleReservedTripsForUser.next(this.reservedTripsForUser);
  }

  public getAmountOfReservedTripsForUser(): Observable<number> {
    this.getReservedTripsForUser().subscribe((trips: Trip[]) => {
      let amount = 0;
      for (const trip of trips) {

        amount += trip.amount;
      }
      return this.subjectAmount.next(amount);
    });
    return this.subjectAmount.asObservable();
  }

  public getTotalPriceOfReservedTripsForUser(): Observable<number> {
    this.getReservedTripsForUser().subscribe((trips: Trip[]) => {
      let priceSum = 0;
      for (const trip of trips) {
        priceSum += (trip.unitPrice * trip.amount);
      }
      this.subjectPrice.next(priceSum);
    });
    return this.subjectPrice.asObservable();
  }

}
