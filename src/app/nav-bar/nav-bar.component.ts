import { Component, OnInit } from '@angular/core';
import { faPlane, faCircle, faCartArrowDown, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { ICart } from '../Models/cart';
import { CartService } from '../services/cart.service';
import { NotificationsService } from '../services/notifications.service';
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
  public cart: ICart = {
    reservedTotalAmount: 0,
    priceTotalAmount: [0],
    tripsReserved: []
  };
  private _toggleNotification: boolean = false;

  constructor(private cartService: CartService, private notificationService: NotificationsService) {
  }


  ngOnInit(): void {
    this.cartService.addingPlaceEventListener().subscribe(info => {
      this.cart = info;
    })
  }


  public toggleHidden(event: any, hidden: any): void {
    hidden.classList.toggle("hidden");
  }

  public toggleNotification(event: any) {
    this.notificationService.emitEventshowNotification(this._toggleNotification)
    this._toggleNotification = !this._toggleNotification;

  }

}
