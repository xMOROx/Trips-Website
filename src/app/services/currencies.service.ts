import { Injectable } from '@angular/core';
import { ICurrency } from '../Models/currency';

const CURRENCIES: ICurrency[] = [
  { symbol: "$", id: 0 }, { symbol: "€", id: 1 }
]


@Injectable({
  providedIn: 'root'
})

export class CurrenciesService {


  constructor() { }



  public get getCurrencies(): ICurrency[] {
    return CURRENCIES;
  }


  public getCurrencyById(id: number): ICurrency | null {
    for (const currency of CURRENCIES) {
      if (currency.id === id) {
        return currency;
      }
    }
    return null;
  }

  public get getNumberOfCurrencies(): number {
    return CURRENCIES.length;
  }

  public getCurrencybySymbol(symbol: string): ICurrency | null {
    for (const currency of CURRENCIES) {
      if (currency.symbol === symbol) {
        return currency;
      }
    }
    return null;
  }

}
