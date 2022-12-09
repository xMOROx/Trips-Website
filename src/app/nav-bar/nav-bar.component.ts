import { Component, OnInit } from '@angular/core';
import { faPlane, faCircle, faCartArrowDown, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { NotificationsService } from '../services/notifications.service';
import { INotification } from '../Models/INotification';
import { NotificationType } from '../Models/notificationType.enum';
import { TripsParseService } from '../services/tripsParse.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public faPlane: IconDefinition = faPlane;
  public faCircle: IconDefinition = faCircle;
  public faCartArrowDown: IconDefinition = faCartArrowDown;
  public faBell: IconDefinition = faBell;
  public notifications: INotification[] = [];
  public _toggleNotification: boolean = false;
  public notificationType: typeof NotificationType = NotificationType;
  public lastNotification: INotification | undefined;
  public reservedTotalAmount = 0;

  constructor(private tripsParseService: TripsParseService, private notificationService: NotificationsService) {
  }


  ngOnInit(): void {
    this.notificationService.getNotifications().valueChanges().subscribe((notifications: INotification[]) => {
      this.notifications = notifications.filter(notification => { return notification.type !== NotificationType.archival });
      if (this.notifications.length !== 0) {
        this.lastNotification = this.notifications[this.notifications.length - 1];
      } else {
        this.lastNotification = undefined;
      }
    });

    this.tripsParseService.getAmountOfReservedTrips().subscribe(value => {
      this.reservedTotalAmount = value;
    });
    this.notificationService.showNotificationListener().subscribe(flag => {
      this._toggleNotification = flag;
    });
  }


  public toggleHidden(_: any, hidden: any): void {
    hidden.classList.toggle("hidden");
  }

  public toggleNotification(_: any): void {
    this._toggleNotification = !this._toggleNotification;
    this.notificationService.emitEventShowNotification(this._toggleNotification)
  }

}
