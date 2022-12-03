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
  public value: boolean = false;
  public notifications: INotification[] = [];
  notificationType: typeof NotificationType = NotificationType;

  constructor(private notificationService: NotificationsService) { }

  ngOnInit() {
    this.notificationService.showNotificationListener().subscribe(value => {
      this.value = value;
    });
    this.notificationService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
    })
  }

}
