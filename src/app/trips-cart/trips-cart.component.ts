import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ICart } from '../Models/cart';

import { faClock, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { CurrenciesService } from '../services/currencies.service';
import { ICurrency } from '../Models/currency';
import { Trip } from '../Models/trip';
import { BoughtTripsService } from '../services/boughtTrips.service';
import { TripStatus } from '../Models/tripStatus.enum';
import { TripsParseService } from '../services/tripsParse.service';

const TITLE = "Koszyk";

@Component({
  selector: 'app-trips-cart',
  templateUrl: './trips-cart.component.html',
  styleUrls: ['./trips-cart.component.css']
})

export class TripsCartComponent implements OnInit {

  public cart: ICart = {
    reservedTotalAmount: 0,
    priceTotalAmount: 0,
    tripsReserved: []
  };

  public currencies!: ICurrency[];

  public faClock: any = faClock;
  public faPlus: any = faPlus;
  public faMinus: any = faMinus;
  public showDetails: boolean = false;

  constructor(private titleService: Title, private tripsParseService: TripsParseService, private currenciesService: CurrenciesService, private buyTripService: BoughtTripsService) {

  }

  ngOnInit() {
    this.titleService.setTitle(TITLE);

    this.tripsParseService.getTrips().valueChanges().subscribe((trips: Trip[]) => {
      this.cart.tripsReserved = trips.filter(trip => trip.status === TripStatus.reserved);
    });

    this.tripsParseService.getAmountOfReservedTrips().subscribe(value => {
      this.cart.reservedTotalAmount = value;
    });

    this.currencies = this.currenciesService.getCurrencies;
  }

  private formatDate(date: Date): string {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  public changeView(): void {
    this.showDetails = !this.showDetails;
  }

  public buyTrip(trip: Trip): void {
    trip.status = TripStatus.bought;
    trip.boughtDate = this.formatDate(new Date());
    this.buyTripService.addTrip({ ...trip });
    this.tripsParseService.updateTripSingleValue(trip.key!, { maxPlace: trip.maxPlace - trip.amount, status: TripStatus.bought, amount: 0 });
  }

}
