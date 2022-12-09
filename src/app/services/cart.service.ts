import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICart } from '../Models/cart';
import { ICurrency } from '../Models/currency';
import { Trip } from '../Models/trip';
import { CurrenciesService } from './currencies.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: ICart = {
    reservedTotalAmount: 0,
    priceTotalAmount: [],
    tripsReserved: []
  }

  private reservedTripHandler: BehaviorSubject<ICart> = new BehaviorSubject<ICart>(this.cart);

  constructor(private currenciesService: CurrenciesService) {

    for (const _ of [...Array.from({ length: this.currenciesService.getNumberOfCurrencies }, (_, i) => i)]) {
      this.cart.priceTotalAmount.push(0);

    }
  }

  private sameId(key1: string, key2: string): boolean {
    return key1 === key2;
  }

  private includeTrip(trip: Trip): boolean {
    for (const tripReserved of this.cart.tripsReserved) {
      if (this.sameId(tripReserved.key, trip.key)) {
        return true;
      }
    }
    return false;
  }

  private hasSameAmount(trip: Trip): boolean {
    for (const tripReserved of this.cart.tripsReserved) {
      if (this.sameId(tripReserved.key, trip.key) && tripReserved.amount === trip.amount) {
        return true;
      }
    }
    return false;
  }

  private removeTripWithZeroAmount(): Trip[] {
    return this.cart.tripsReserved.filter((trip) => {
      return trip.amount !== 0;
    });
  }


  public emitEventAddingPlace(amount: number, symbol: string, price?: number, trip?: Trip): void {
    if (price !== undefined) {
      let symbolCurrency: ICurrency | null = this.currenciesService.getCurrencybySymbol(symbol);
      if (symbolCurrency !== null) {
        this.cart.priceTotalAmount[symbolCurrency.id] += price;
      }
    }

    if (trip !== undefined) {

      if (!this.includeTrip(trip)) {
        this.cart.tripsReserved.push(trip);
      }

      if (!this.hasSameAmount(trip)) {
        for (const index in this.cart.tripsReserved) {
          if (this.sameId(this.cart.tripsReserved[index].key, trip.key)) {
            this.cart.tripsReserved[index].amount = trip.amount;
          }
        }
      }
    }

    this.cart.tripsReserved = this.removeTripWithZeroAmount();

    this.cart.reservedTotalAmount += amount;
    this.reservedTripHandler.next(this.cart);
  }

  public addingPlaceEventListener(): Observable<ICart> {
    return this.reservedTripHandler.asObservable();
  }

  public removeTripById(key: string): void {
    this.cart.tripsReserved = this.cart.tripsReserved.filter(trip => {
      if (trip.key === key) {
        this.cart.reservedTotalAmount -= trip.amount;
        let symbolCurrency: ICurrency | null = this.currenciesService.getCurrencybySymbol(trip.currency);
        if (symbolCurrency !== null) {
          this.cart.priceTotalAmount[symbolCurrency.id] -= trip.unitPrice * trip.amount;
        }
        return false;
      }
      return true;
    });
    this.reservedTripHandler.next(this.cart);
  }

}
