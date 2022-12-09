import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { ComponentsOfApplication } from '../Models/componentsOfApplication.enum';
import { INotification } from '../Models/INotification';
import { NotificationType } from '../Models/notificationType.enum';
import { Trip } from '../Models/trip';
import { TripStatus } from '../Models/tripStatus.enum';
import { NotificationsService } from './notifications.service';

const DAY_BEFORE_TRIP_START_REMINDER = 400; //zmienione w celach testowych
@Injectable({
  providedIn: 'root'
})
export class BoughtTripsService {

  public statusType: typeof TripStatus = TripStatus;
  private boughtTripsRef: any;

  constructor(private notificationsService: NotificationsService, private fireDataBaseRef: AngularFireDatabase) {
    this.boughtTripsRef = fireDataBaseRef.list('BoughtTrips');
    this.getBoughtTrips().subscribe(trips => {
      trips.forEach(trip => {
        this.setStatus(trip);
        this.updateTripByValue(trip, { status: trip.status });
        this.sendReminderNotification(trip);
      });
    });
  }

  private setStatus(trip: Trip): void {
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
    const key = this.fireDataBaseRef.database.ref('BoughtTrips').push().key!;
    trip.key = key;
    trip.maxPlace = -1;
    this.setStatus(trip);
    this.fireDataBaseRef.database.ref('BoughtTrips').child(key).set(trip);
  }

  public getBoughtTrips(): Observable<Trip[]> {
    return this.boughtTripsRef.valueChanges();
  }

  private sendReminderNotification(trip: Trip): void {
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
    this.fireDataBaseRef.database.ref('BoughtTrips').child(trip.key!).update(value);
  }


}
