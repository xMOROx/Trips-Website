import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from 'src/app/Models/trip';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(trips: Trip[], minimumPrice: number, maximumPrice: number): Trip[] {
    if (!trips) {
      return [];
    }
    if (!minimumPrice && !maximumPrice) {
      return trips;
    } else if (minimumPrice && !maximumPrice) {
      return trips.filter((trip) => {
        return trip.unitPrice >= minimumPrice;
      });
    } else if (!minimumPrice && maximumPrice) {
      return trips.filter((trip) => {
        return trip.unitPrice <= maximumPrice;
      });
    }
    return trips.filter((trip) => {
      return minimumPrice <= trip.unitPrice && trip.unitPrice <= maximumPrice;
    });
  }
}
