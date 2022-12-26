import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { Observable, ReplaySubject } from 'rxjs';
import { ComponentsOfApplication } from '../Models/componentsOfApplication.enum';
import { INotification } from '../Models/Notification';
import { NotificationType } from '../Models/notificationType.enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notifications: INotification[] = [];
  private notificationBar: ReplaySubject<boolean> = new ReplaySubject<boolean>();
  private noticiationsRef: ReplaySubject<INotification[]> = new ReplaySubject<INotification[]>();
  constructor() {

  }

  public emitEventShowNotification(value: boolean): void {
    this.notificationBar.next(value);
  }

  public showNotificationListener(): Observable<boolean> {
    return this.notificationBar.asObservable();
  }

  public sendNotification(notification: INotification): void {
    this.notifications.push(notification);
    this.noticiationsRef.next(this.notifications);
  }

  public removeNotificationByKey(key: string): void {
    this.notifications = this.notifications.filter((notification: INotification) => notification.key !== key);
    this.noticiationsRef.next(this.notifications);
  }

  public removeAllNotifications(): void {
    this.notifications = [];
    this.noticiationsRef.next(this.notifications);
  }

  public updateNotificationByKey(key: string, value: INotification): void {
    this.notifications.find((notification: INotification) => notification.key === key)!.type = value.type;
    this.noticiationsRef.next(this.notifications);
  }

  public getNotifications(): any {
    return this.noticiationsRef.asObservable();
  }

  public clearErrorsFrom(from_: ComponentsOfApplication) {
    this.notifications.forEach((notification: INotification) => {
      if (notification.from === from_) {
        this.updateNotificationByKey(notification.key!, { type: NotificationType.archival });
      }
    });
  }

  ngOnDestroy(): void {
    this.notificationBar.unsubscribe();
  }
}
