import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from 'firebase/auth';
import { BehaviorSubject, filter, Observable, switchMap } from 'rxjs';
import { ComponentsOfApplication } from '../Models/componentsOfApplication.enum';
import { INotification } from '../Models/Notification';
import { NotificationType } from '../Models/notificationType.enum';
import { Trip } from '../Models/trip';
import { TripStatus } from '../Models/tripStatus.enum';
import { AuthService } from './auth.service';
import { NotificationsService } from './notifications.service';

const URL = "BoughtTrips";
const DAY_BEFORE_TRIP_START_REMINDER = 400; //zmienione w celach testowych
@Injectable({
  providedIn: 'root'
})
export class BoughtTripsService {

  public user!: User;
  public statusType: typeof TripStatus = TripStatus;

  private boughtTripsRef: any | undefined;
  private boughtTripsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor
    (
      public auth: AuthService,
      private fireDataBaseRef: AngularFireDatabase,
      private notificationsService: NotificationsService,
    ) {

    this.auth.userObservable().pipe(filter((res: any) => res)).subscribe((res: User) => {
      this.user = res;
      this.boughtTripsRef = this.fireDataBaseRef.list(URL + `/${this.user.uid}`);
      this.boughtTripsRef
        .valueChanges()
        .pipe(switchMap((trips: Trip[]) => trips ? trips : []))
        .subscribe((trips: Trip[]) => {
          this.boughtTripsSubject.next(trips)
        });
    });
  }

  public get boughtTrips(): Observable<Trip[]> {
    return this.boughtTripsSubject.value;
  }

  public tripsObservable(): Observable<Trip[]> {
    return this.boughtTripsSubject.asObservable();
  }

  public get allBoughtTrips(): any {
    return this.fireDataBaseRef.list(URL).valueChanges();
  }

  public setStatus(trip: Trip): void {
    const currentDate = new Date();
    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);

    if (currentDate < startDate) {
      trip.status = TripStatus.beforeStart;
    } else if (currentDate >= startDate && currentDate <= endDate) {
      trip.status = TripStatus.inProgress;
    } else if (currentDate > endDate) {
      trip.status = TripStatus.archival;
    }
  }

  public addTrip(trip: Trip): void {
    const key = this.fireDataBaseRef.database.ref(URL + `/${this.user.uid}`).push().key!;
    trip.maxPlace = -1;
    trip.oldKey = trip.key ?? '';
    trip.key = key;
    trip.getNotification = false;
    this.setStatus(trip);
    this.fireDataBaseRef.database.ref(URL + `/${this.user.uid}`).child(trip.key!).set(trip);
  }

  public getBoughtTrips(): Observable<Trip[]> {
    if (this.boughtTripsRef === undefined) {
      return new Observable<Trip[]>();
    }
    return this.boughtTripsRef.valueChanges();
  }

  public sendReminderNotification(trip: Trip): void {
    const one_day: number = 1000 * 60 * 60 * 24;
    const currentDate: Date = new Date();
    const startDate: Date = new Date(trip.startDate);
    const diff: number = startDate.getTime() - currentDate.getTime();

    if (diff < 0) {
      return;
    }

    const days = Math.round(diff / one_day);

    if (days <= DAY_BEFORE_TRIP_START_REMINDER) {
      let end: string = days == 1 ? 'dzień' : 'dni';
      const notification: INotification = {
        title: "Przypomnienie o zbliżającej się wycieczce.",
        description: `Twoja wycieczka '${trip.name}' rozpocznie się za ${days} ${end}.`,
        type: NotificationType.info,
        date: new Date().toLocaleString(),
        from: ComponentsOfApplication.BuyHistory,
      } as INotification;
      this.notificationsService.sendNotification(notification);
    }
  }

  public updateTripByValue(trip: Trip, value: Object): void {
    this.fireDataBaseRef.database.ref(URL + `/${this.user.uid}`).child(trip.key!).update(value);
  }
}
