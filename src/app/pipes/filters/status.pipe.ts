import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from 'src/app/Models/trip';
import { TripStatus } from 'src/app/Models/tripStatus.enum';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  private filterTripByCountry(boughtTrips: Trip[], statusArray: TripStatus[]): Trip[] {
    let selectedTrips: Trip[] = [];
    for (const status of statusArray) {
      for (const trip of boughtTrips) {
        if (trip.status === status) {
          selectedTrips.push(trip);
        }
      }
    }
    return selectedTrips;
  }

  transform(boughtTrips: Trip[], statusArray: TripStatus[]): any {
    if (!boughtTrips) return [];
    if (statusArray.length === 0) return boughtTrips;
    return this.filterTripByCountry(boughtTrips, statusArray);
  }

}
