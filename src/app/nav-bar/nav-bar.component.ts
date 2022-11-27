import { Component, OnInit } from '@angular/core';
import { Icon } from '@fortawesome/fontawesome-svg-core';
import { faPlane, faCircle, faCartArrowDown, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { ICart } from '../Models/cart';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public faPlane: IconDefinition = faPlane;
  public faCircle: IconDefinition = faCircle;
  public faCartArrowDown: IconDefinition = faCartArrowDown;
  public cart: ICart = {
    reservedTotalAmount: 0,
    priceTotalAmount: [0],
    tripsReserved: []
  };
  constructor(private cartService: CartService) {
  }


  ngOnInit(): void {
    this.cartService.addingPlaceEventListener().subscribe(info => {
      this.cart = info;
    })
  }


  public toggleHidden(event: any, hidden: any): void {
    hidden.classList.toggle("hidden");
  }

}
