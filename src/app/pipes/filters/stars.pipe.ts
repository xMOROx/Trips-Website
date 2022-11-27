import { Pipe, PipeTransform } from '@angular/core';
import { IStar } from 'src/app/Models/star';
import { Trip } from 'src/app/Models/trip';

@Pipe({
  name: 'stars'
})
export class StarsPipe implements PipeTransform {

  private filterTripByStars(trips: Trip[], stars: IStar[]): Trip[] {
    let selectedTrips: Trip[] = [];
    for (const star of stars) {

      for (const trip of trips) {
        let rating = (trip.likes) / (trip.dislikes + trip.likes) * 100;
        if (star.startValue <= rating && star.endValue >= rating) {

          selectedTrips.push(trip);
        }
      }
    }
    return selectedTrips;
  }

  transform(trips: Trip[], stars: IStar[]): Trip[] {
    if (!trips) {
      return [];
    }
    if (stars.every((value) => value.startValue === 0)) {
      return trips;
    }
    return this.filterTripByStars(trips, stars);
  }

}
