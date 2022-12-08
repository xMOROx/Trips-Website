import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  private boughtTrips: Trip[] = [];
  private boughtTripHandler: BehaviorSubject<Trip[]> = new BehaviorSubject<Trip[]>(this.boughtTrips);
  public statusType: typeof TripStatus = TripStatus;

  constructor(private notificationsService: NotificationsService) { }

  private setStatus(): void {
    this.boughtTrips.map(trip => {
      const boughtDate = new Date(trip.boughtDate);
      const startDate = new Date(trip.startDate);
      const endDate = new Date(trip.endDate);

      if (boughtDate < startDate) {
        trip.status = TripStatus.beforeStart;
      } else if (boughtDate >= startDate && boughtDate <= endDate) {
        trip.status = TripStatus.inProgress;
      } else if (boughtDate > endDate) {
        trip.status = TripStatus.archival;
      }
    });
  }


  public addTrip(trip: Trip): void {

    this.boughtTrips.push(trip);
    this.setStatus();
    this.boughtTripHandler.next(this.boughtTrips);
  }

  public getBoughtTrips(): Observable<Trip[]> {
    return this.boughtTripHandler.asObservable();
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
        date: new Date(),
        id: 0,
      } as INotification;
      this.notificationsService.sendNotification(notification);
    }
  }

  public sendReminderNotificationForAll(): void {
    for (const trip of this.boughtTrips) {
      this.sendReminderNotification(trip);
    }
  }


}
