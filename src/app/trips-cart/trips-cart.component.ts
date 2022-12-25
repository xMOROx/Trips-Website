import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ICart } from '../Models/cart';

import { faClock, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Trip } from '../Models/trip';
import { TripStatus } from '../Models/tripStatus.enum';
import { BoughtTripsService } from '../services/boughtTrips.service';
import { ReservedTripsForUserService } from '../services/reservedTripsForUser.service';
import { SettingsChangeService } from '../services/settingsChange.service';
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

  private removeTripFromCart(trip: Trip): void {
    this.reservedTripsForUserService.removeTrip(trip);
  }

  private removeTripFromLocalCart(trip: Trip): void {
    this.cart.tripsReserved = this.cart.tripsReserved.filter((tripReserved: Trip) => tripReserved.key !== trip.key);
    this.cart.priceTotalAmount -= trip.unitPrice;
    this.cart.reservedTotalAmount -= trip.amount;
  }

  private removeTrip(trip: Trip): void {
    this.removeTripFromCart(trip);
    this.removeTripFromLocalCart(trip);
  }

  public buyTrip(trip: Trip): void {
    trip.status = TripStatus.bought;
    trip.boughtDate = this.formatDate(new Date());
    this.buyTripService.addTrip({ ...trip });

    if (trip.maxPlace - trip.amount === 0) {
      this.tripsParseService.updateTripSingleValue(trip.key!,
        { maxPlace: trip.maxPlace - trip.amount, status: TripStatus.archival, amount: 0 });
      return;
    }
    this.removeTrip(trip);
    this.tripsParseService.updateTripSingleValue(trip.key!,
      { maxPlace: trip.maxPlace - trip.amount, status: TripStatus.listed, amount: 0 });
  }

  public onRemove(trip: Trip, value: number): void {
    trip.amount = value;
    this.reservedTripsForUserService.setReservedTripsForUser(trip);

  }

  public onRemoveWithStatus(trip: Trip): void {
    trip.status = TripStatus.listed;
    trip.amount = 0;
    this.reservedTripsForUserService.setReservedTripsForUser(trip);

  }

}
