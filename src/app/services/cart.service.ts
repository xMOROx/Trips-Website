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

  private addOnePlace: BehaviorSubject<ICart> = new BehaviorSubject<ICart>(this.cart);

  constructor(private currenciesService: CurrenciesService) {

    for (const _ of [...Array.from({ length: this.currenciesService.getNumberOfCurrencies }, (_, i) => i)]) {
      this.cart.priceTotalAmount.push(0);

    }
  }

  private sameId(id1: number, id2: number): boolean {
    return id1 === id2;
  }

  private includeTrip(trip: Trip): boolean {
    for (const tripReserved of this.cart.tripsReserved) {
      if (this.sameId(tripReserved.id, trip.id)) {
        return true;
      }
    }
    return false;
  }

  private hasSameAmount(trip: Trip): boolean {
    for (const tripReserved of this.cart.tripsReserved) {
      if (this.sameId(tripReserved.id, trip.id) && tripReserved.amount === trip.amount) {
        return true;
      }
    }
    return false;
  }

  private removeTripWithZeroAmount(): Trip[] {
    return this.cart.tripsReserved.filter((trip) => {
      return trip.amount !== 0;
    })
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
          if (this.sameId(this.cart.tripsReserved[index].id, trip.id)) {
            this.cart.tripsReserved[index].amount = trip.amount;
          }
        }
      }
    }

    this.cart.tripsReserved = this.removeTripWithZeroAmount();

    this.cart.reservedTotalAmount += amount;
    this.addOnePlace.next(this.cart);
  }

  public addingPlaceEventListener(): Observable<ICart> {
    return this.addOnePlace.asObservable();
  }

}
