import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ICart } from '../Models/cart';
import { CartService } from '../services/cart.service';

import { faClock, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { CurrenciesService } from '../services/currencies.service';
import { ICurrency } from '../Models/currency';

const TITLE = "Koszyk";

@Component({
  selector: 'app-trips-cart',
  templateUrl: './trips-cart.component.html',
  styleUrls: ['./trips-cart.component.css']
})

export class TripsCartComponent implements OnInit {

  public cart: ICart = {
    reservedTotalAmount: 0,
    priceTotalAmount: [0],
    tripsReserved: []
  };

  public currencies!: ICurrency[];

  public faClock: any = faClock;
  public faPlus: any = faPlus;
  public faMinus: any = faMinus;
  public showDetails: boolean = false;

  constructor(private titleService: Title, private cartService: CartService, private currenciesService: CurrenciesService) {

  }

  ngOnInit() {
    this.titleService.setTitle(TITLE);
    this.cartService.addingPlaceEventListener().subscribe(info => {
      this.cart = info;
    });
    this.currencies = this.currenciesService.getCurrencies
  }

  public changeView(): void {
    this.showDetails = !this.showDetails;
  }

}
