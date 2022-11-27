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
        return new Date(trip.StartData) >= new Date(startDate);
      });

    } else if (!startDate && EndDate) {
      return trips.filter((trip) => {
        return new Date(trip.EndData) <= new Date(EndDate);
      });
    }
    return trips.filter((trip) => {
      return new Date(startDate) <= new Date(trip.StartData) && new Date(trip.EndData) <= new Date(EndDate);
    });
  }

}
