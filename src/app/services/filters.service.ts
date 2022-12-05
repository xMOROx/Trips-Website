import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IFilter } from '../Models/filter';
import { IStar } from '../Models/star';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private filter: IFilter = {
    stars: [
      { startValue: 0, endValue: 0 },
      { startValue: 0, endValue: 0 },
      { startValue: 0, endValue: 0 },
      { startValue: 0, endValue: 0 },
      { startValue: 0, endValue: 0 }
    ],
    minimumUnitPrice: 0,
    maximumUnitPrice: 0,
    dateStart: '',
    dateEnd: '',
    destinationCountry: ["all"]
  }

  private filteredData: BehaviorSubject<IFilter> = new BehaviorSubject<IFilter>(this.filter);

  constructor() { }

  private generateFilter(countries: string[], minimumPrice: number, maximumPrice: number, startDate: string, endDate: string, stars?: IStar[]): IFilter {
    if (countries === null) {
      countries = [];
    }
    if (minimumPrice === null) {
      minimumPrice = 0;
    }
    if (maximumPrice === null) {
      maximumPrice = 0;
    }
    if (startDate === null) {
      startDate = "";
    }
    if (endDate === null) {
      endDate = "";
    }

    if (stars === null) {
      stars = [];
    }

    return {
      stars: stars,
      minimumUnitPrice: minimumPrice,
      maximumUnitPrice: maximumPrice,
      dateStart: startDate,
      dateEnd: endDate,
      destinationCountry: countries
    } as IFilter;
  }

  public emitEventFilteredData(countries: string[], minimumPrice: number, maximumPrice: number, startDate: string, endDate: string, stars?: IStar[]) {
    this.filter = this.generateFilter(countries, minimumPrice, maximumPrice, startDate, endDate, stars);
    this.filteredData.next(this.filter);
  }

  public filteredDataEventListener(): Observable<IFilter> {
    return this.filteredData.asObservable();
  }

}
