import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Currencies } from '../Models/Currencies.enum';

@Injectable({
  providedIn: 'root'
})
export class SettingsChangeService {
  public currency: BehaviorSubject<string> = new BehaviorSubject<string>(Currencies.EUR);
  constructor() { }

  public changeCurrency(currency: string): void {
    this.currency.next(currency);
  }

  public getCurrency(): Observable<string> {
    return this.currency.asObservable();
  }

}
