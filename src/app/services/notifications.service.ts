import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { INotification } from '../Models/INotification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notificationBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private notifications: INotification[] = [];
  private notificationsSender: BehaviorSubject<INotification[]> = new BehaviorSubject<INotification[]>(this.notifications);

  constructor() { }

  public emitEventShowNotification(value: boolean): void {
    this.notificationBar.next(value);
  }

  public showNotificationListener(): Observable<boolean> {
    return this.notificationBar.asObservable();
  }

  public sendNotification(notification: INotification): void {
    this.notifications.push(notification);
    this.notificationsSender.next(this.notifications);
  }

  public getNotifications(): Observable<INotification[]> {
    return this.notificationsSender.asObservable();
  }
}
