import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  public value: boolean = false;

  constructor(private notificationService: NotificationsService) { }

  ngOnInit() {
    this.notificationService.showNotificationListener().subscribe(value => {
      this.value = value;

    })
  }

}
