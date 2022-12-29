import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, filter, Observable, switchMap, of, zip, concat } from 'rxjs';
import { Trip } from '../Models/trip';
import { User } from '../Models/User';
import { AuthService } from './auth.service';
import { TripsParseService } from './tripsParse.service';

const URL = "ReservedTrips";
@Injectable({
  providedIn: 'root'
})
export class ReservedTripsForUserService {

  private user!: User;
  private refReservedTripsForUser: any;
  private subjectAmount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private subjectPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private reservedTripsForUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(
    private authService: AuthService,
    private angularFireDatabase: AngularFireDatabase,
  ) {
    this.authService.userObservable().pipe(filter((res: any) => res)).subscribe((user: User) => {
      this.user = user;
      this.refReservedTripsForUser = this.angularFireDatabase.list(URL + `/${this.user.uid}`);

      this.refReservedTripsForUser
        .valueChanges()
        .subscribe((trips: any) => {
          this.reservedTripsForUserSubject.next(trips);
        });
    });

  }

  public get reservedTrips(): Observable<Trip[]> {
    return this.reservedTripsForUserSubject.value;
  }

  public getReservedTripsForUser(): Observable<Trip[]> {
    return this.reservedTripsForUserSubject.asObservable();
  }

  public removeTrip(trip: Trip): void {
    this.angularFireDatabase.database.ref(URL + `/${this.user.uid}`).child(trip.key!).remove().then(() => {
      this.reservedTripsForUserSubject.next(false)
    });
  }

  public setReservedTripsForUser(trip: Trip): void {
    this.angularFireDatabase.database.ref(URL + `/${this.user.uid}`).child(trip.key!).set(trip);
  }

  public updateReservedTripsForUser(trip: Trip): void {
    this.angularFireDatabase.database.ref(URL + `/${this.user.uid}`).child(trip.key!).update(trip);
  }

  public updateReservedTripsForUserByValue(trip: Trip, value: Object): void {
    this.angularFireDatabase.database.ref(URL + `/${this.user.uid}`).child(trip.key!).update(value);
  }
  public getAmountOfReservedTripsForUser(): Observable<number> {
    this.getReservedTripsForUser().pipe(filter((res: any) => res)).subscribe((trips: Trip[]) => {
      let amount = 0;
      for (const trip of trips) {
        amount += trip.amount;
      }
      return this.subjectAmount.next(amount);
    });
    return this.subjectAmount.asObservable();
  }

  public getTotalPriceOfReservedTripsForUser(): Observable<number> {
    this.getReservedTripsForUser().pipe(filter((res: any) => res)).subscribe((trips: Trip[]) => {
      let priceSum = 0;
      for (const trip of trips) {
        priceSum += (trip.unitPrice * trip.amount);
      }
      this.subjectPrice.next(priceSum);
    });
    return this.subjectPrice.asObservable();
  }


}
