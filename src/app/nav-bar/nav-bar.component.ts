import { Component, OnInit } from '@angular/core';
import { faPlane, faCircle, faCartArrowDown, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { ICart } from '../Models/cart';
import { CartService } from '../services/cart.service';
import { NotificationsService } from '../services/notifications.service';
import { INotification } from '../Models/INotification';
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
  public cart: ICart = {
    reservedTotalAmount: 0,
    priceTotalAmount: [0],
    tripsReserved: []
  };
  public _toggleNotification: boolean = false;

  constructor(private cartService: CartService, private notificationService: NotificationsService) {
  }


  ngOnInit(): void {
    this.cartService.addingPlaceEventListener().subscribe(info => {
      this.cart = info;
    });
    this.notificationService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
    });
  }


  public toggleHidden(event: any, hidden: any): void {
    hidden.classList.toggle("hidden");
  }

  public toggleNotification(event: any) {
    this.notificationService.emitEventShowNotification(this._toggleNotification)
    this._toggleNotification = !this._toggleNotification;

  }

}
