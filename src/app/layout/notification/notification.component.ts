import { Component, OnInit } from '@angular/core';
import { INotification } from '../../Models/Notification';
import { NotificationType } from '../../Models/notificationType.enum';
import { NotificationsService } from '../../services/notifications.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  public showed: boolean = false;
  public notifications: INotification[] = [];
  public notificationType: typeof NotificationType = NotificationType;

  constructor
    (
      private notificationService: NotificationsService,
    ) { }

  ngOnInit() {
    this.notificationService.showNotificationListener().subscribe(flag => {
      this.showed = flag;
    });
    this.notificationService.getNotifications().subscribe((notifications: INotification[]) => {
      this.notifications = notifications.filter(notification => { return notification.type !== NotificationType.archival });
    });
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
