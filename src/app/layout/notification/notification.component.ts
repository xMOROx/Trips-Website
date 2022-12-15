import { Component, ElementRef, OnInit } from '@angular/core';
import { INotification } from '../../Models/INotification';
import { NotificationsService } from '../../services/notifications.service';
import { NotificationType } from '../../Models/notificationType.enum';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  host: {
    '(document:click)': 'onClick($event)'
  }
})
export class NotificationComponent implements OnInit {
  public showed: boolean = false;
  public notifications: INotification[] = [];
  public notificationType: typeof NotificationType = NotificationType;
  constructor(
    private notificationService: NotificationsService,
    private _eref: ElementRef
  ) { }

  ngOnInit() {
    this.notificationService.showNotificationListener().subscribe(flag => {
      this.showed = flag;
    });
    this.notificationService.getNotifications().valueChanges().subscribe((notifications: INotification[]) => {
      this.notifications = notifications.filter(notification => { return notification.type !== NotificationType.archival });
    });

  }

  public onClick(event: any) {
    if (!this._eref.nativeElement.contains(event.target)) {
      // if (this.showed) {
      //   this.showed = false;
      // }
      console.log("click outside");

    }
  }

  public closeNotification(notification: INotification): void {
    this.notificationService.removeNotificationByKey(notification.key!);
  }

  public closeAllNotifications(): void {
    this.notificationService.removeAllNotifications();
  }

  closeWindow(): void {
    this.showed = !this.showed;
    this.notificationService.emitEventShowNotification(this.showed);
  }

}
