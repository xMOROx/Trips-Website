import { Component, OnInit } from '@angular/core';
import { INotification } from '../Models/INotification';
import { NotificationsService } from '../services/notifications.service';
import { NotificationType } from '../Models/notificationType.enum';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  public hidden: boolean = false;
  public notifications: INotification[] = [];
  public notificationType: typeof NotificationType = NotificationType;

  constructor(private notificationService: NotificationsService) { }

  ngOnInit() {
    this.notificationService.showNotificationListener().subscribe(flag => {
      this.hidden = flag;
    });
    this.notificationService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
    })
  }

  public closeNotification(notification: any): void {
    this.notificationService.removeNotificationById(notification.id);
  }


}
