import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ICart } from '../Models/cart';

import { faClock, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { Trip } from '../Models/trip';
import { BoughtTripsService } from '../services/boughtTrips.service';
import { TripStatus } from '../Models/tripStatus.enum';
import { TripsParseService } from '../services/tripsParse.service';
import { SettingsChangeService } from '../services/settingsChange.service';
import { ReservedTripsForUserService } from '../services/reservedTripsForUser.service';

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
  public statusType: typeof TripStatus = TripStatus;
  public currency!: string;
  public faClock: any = faClock;
  public faPlus: any = faPlus;
  public faMinus: any = faMinus;
  public showDetails: boolean = false;

  constructor(private titleService: Title,
    private tripsParseService: TripsParseService,
    private buyTripService: BoughtTripsService,
    private setting: SettingsChangeService,
    private reservedTripsForUserService: ReservedTripsForUserService
  ) {

  }

  ngOnInit() {
    this.titleService.setTitle(TITLE);


    this.reservedTripsForUserService.getReservedTripsForUser().subscribe((trips: Trip[]) => {
      this.cart.tripsReserved = trips;
    });

    this.reservedTripsForUserService.getAmountOfReservedTripsForUser().subscribe((amount: number) => {
      this.cart.reservedTotalAmount = amount;
    });

    this.reservedTripsForUserService.getTotalPriceOfReservedTripsForUser().subscribe((price: number) => {
      this.cart.priceTotalAmount = price;

    });


    this.setting.getCurrency().subscribe((currency) => {
      this.currency = currency.value;
    });


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
    if (trip.maxPlace - trip.amount === 0) {
      this.tripsParseService.updateTripSingleValue(trip.key!, { maxPlace: trip.maxPlace - trip.amount, status: TripStatus.archival, amount: 0 });
      return;
    }

    this.tripsParseService.updateTripSingleValue(trip.key!, { maxPlace: trip.maxPlace - trip.amount, status: TripStatus.listed, amount: 0 });
  }

  public onRemove(trip: Trip, value: any): void {
    this.tripsParseService.updateTripSingleValue(trip.key!, value);
  }

}
