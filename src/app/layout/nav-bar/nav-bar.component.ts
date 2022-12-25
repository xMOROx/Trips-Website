import { Component, OnInit } from '@angular/core';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faCartArrowDown, faCircle, faPlane, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthGuard } from '../../authentication/guard/auth.guard';
import { INotification } from '../../Models/Notification';
import { NotificationType } from '../../Models/notificationType.enum';
import { AuthService } from '../../services/auth.service';
import { NotificationsService } from '../../services/notifications.service';
import { ReservedTripsForUserService } from '../../services/reservedTripsForUser.service';
import { HostListener } from "@angular/core";
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
  public isMenuOpen: boolean = false;
  public isMenuOpenDropDown: boolean = false;

  constructor(
    private notificationService: NotificationsService,
    private reservedTripsForUserService: ReservedTripsForUserService,
    public authGuard: AuthGuard,
    public authService: AuthService) {
    this.getScreenSize();
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

    this.reservedTripsForUserService.getAmountOfReservedTripsForUser().subscribe(reservedAmount => {
      this.reservedTotalAmount = reservedAmount;
    });


    this.notificationService.showNotificationListener().subscribe(flag => {
      this._toggleNotification = flag;
    });
  }
  public screenHeight!: number;
  public screenWidth!: number;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 1024) {
      this.isMenuOpenDropDown = true;
    } else {
      this.isMenuOpenDropDown = false;
    }
  }


  public toggleNotification(_: any): void {
    this._toggleNotification = !this._toggleNotification;
    this.notificationService.emitEventShowNotification(this._toggleNotification)
  }


  public toggleHidden(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public clickedOutside(): void {
    this.isMenuOpen = false;
  }
  public clickedOutsideDropDown(): void {
    if (this.screenWidth < 1024) {
      this.isMenuOpenDropDown = false;

    }
  }

  public toggleHiddenDropDown(): void {
    if (this.screenWidth < 1024) {
      this.isMenuOpenDropDown = !this.isMenuOpenDropDown;
    }
  }
}
