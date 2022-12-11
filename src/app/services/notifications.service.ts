import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, first, ObjectUnsubscribedError, Observable, ReplaySubject, Subject } from 'rxjs';
import { ComponentsOfApplication } from '../Models/componentsOfApplication.enum';
import { INotification } from '../Models/INotification';
import { NotificationType } from '../Models/notificationType.enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notificationBar: ReplaySubject<boolean> = new ReplaySubject<boolean>();


  constructor(private fireDataBaseRef: AngularFireDatabase) { }

  public emitEventShowNotification(value: boolean): void {
    this.notificationBar.next(value);
  }

  public showNotificationListener(): Observable<boolean> {
    return this.notificationBar.asObservable();
  }

  public sendNotification(notification: INotification): void {
    notification.key = this.fireDataBaseRef.database.ref('Notifications').push().key!;
    this.fireDataBaseRef.database.ref('Notifications').child(notification.key).set(notification);
  }

  public removeNotificationByKey(key: string): void {
    this.fireDataBaseRef.database.ref('Notifications').child(key).remove();
  }

  public removeAllNotifications(): void {
    this.fireDataBaseRef.database.ref('Notifications').remove();
  }

  public updateNotificationByKey(key: string, value: INotification): void {
    this.fireDataBaseRef.database.ref('Notifications').child(key).update(value);
  }

  public getNotifications(): any {
    return this.fireDataBaseRef.list('Notifications');
  }

  public clearErrorsFrom(from_: ComponentsOfApplication) {
    const cleaner = this.getNotifications().snapshotChanges().pipe(first()).subscribe((data: any) => {
      data.forEach((notification: any) => {
        if (notification.payload.val().from === from_) {
          this.updateNotificationByKey(notification.key, { type: NotificationType.archival });
        }
      });
      cleaner.unsubscribe();
    });

  }


}
