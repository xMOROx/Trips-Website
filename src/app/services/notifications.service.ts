import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { INotification } from '../Models/INotification';
import { NotificationType } from '../Models/notificationType.enum';

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
    if (this.notifications.length !== 0) {
      notification.id = this.notifications[this.notifications.length - 1].id + 1;
    }

    this.notifications.push(notification);
    this.notificationsSender.next(this.notifications);
  }

  public getNotifications(): Observable<INotification[]> {
    return this.notificationsSender.asObservable();
  }

  public clearErrors() {
    this.notifications = this.notifications.filter(notification => {
      return notification.type !== NotificationType.error;
    });
    this.notificationsSender.next(this.notifications);
  }

  public removeNotificationById(id: number): void {
    this.notifications = this.notifications.filter((notification) => {
      return notification.id !== id;
    });
    this.notificationsSender.next(this.notifications);

  }

}
