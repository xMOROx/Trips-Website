import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from 'firebase/auth';
import { first, Observable, ReplaySubject } from 'rxjs';
import { ComponentsOfApplication } from '../Models/componentsOfApplication.enum';
import { INotification } from '../Models/Notification';
import { NotificationType } from '../Models/notificationType.enum';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notificationBar: ReplaySubject<boolean> = new ReplaySubject<boolean>();
  private user?: User;
  private URL = "Notifications"
  constructor(
    private fireDataBaseRef: AngularFireDatabase,
  ) {
    if (localStorage.getItem('user') !== null) {
      this.user = JSON.parse(localStorage.getItem('user')!);
      this.URL += `/${this.user!.uid}`;
    }
  }

  public emitEventShowNotification(value: boolean): void {
    this.notificationBar.next(value);
  }

  public showNotificationListener(): Observable<boolean> {
    return this.notificationBar.asObservable();
  }

  public sendNotification(notification: INotification): void {
    notification.key = this.fireDataBaseRef.database.ref(this.URL).push().key!;
    this.fireDataBaseRef.database.ref(this.URL).child(notification.key).set(notification);
  }

  public removeNotificationByKey(key: string): void {
    this.fireDataBaseRef.database.ref(this.URL).child(key).remove();
  }

  public removeAllNotifications(): void {
    this.fireDataBaseRef.database.ref(this.URL).remove();
  }

  public updateNotificationByKey(key: string, value: INotification): void {
    this.fireDataBaseRef.database.ref(this.URL).child(key).update(value);
  }

  public getNotifications(): any {
    return this.fireDataBaseRef.list(this.URL);
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

  ngOnDestroy(): void {
    this.notificationBar.unsubscribe();
    this.URL = "";
  }


}
