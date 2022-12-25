import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from 'src/app/Models/trip';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(trips: Trip[], startDate: string, EndDate: string): Trip[] {
    if (!trips) {
      return [];
    }
    if (!startDate && !EndDate) {
      return trips;
    } else if (startDate && !EndDate) {
      return trips.filter((trip) => {
        return new Date(trip.startDate) >= new Date(startDate);
      });
    } else if (!startDate && EndDate) {
      return trips.filter((trip) => {
        return new Date(trip.endDate) <= new Date(EndDate);
      });
    }
    return trips.filter((trip) => {
      return new Date(startDate) <= new Date(trip.startDate) && new Date(trip.endDate) <= new Date(EndDate);
    });
  }
}
