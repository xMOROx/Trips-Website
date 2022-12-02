import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notificationBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor() { }

  public emitEventshowNotification(value: boolean): void {
    this.notificationBar.next(value);
  }

  public showNotificationListener(): Observable<boolean> {
    return this.notificationBar.asObservable();
  }



}
