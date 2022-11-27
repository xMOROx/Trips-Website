import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from 'src/app/Models/trip';

@Pipe({
  name: 'destinationCountry'
})
export class DestinationCountryPipe implements PipeTransform {

  private filterTripByCountry(trips: Trip[], selectedCountries: string[]): Trip[] {
    let selectedTrips: Trip[] = [];
    for (const country of selectedCountries) {
      for (const trip of trips) {
        if (country.toLocaleLowerCase() === trip.DestinationCountry.toLocaleLowerCase()) {
          selectedTrips.push(trip);
        }
      }
    }
    return selectedTrips;
  }

  transform(trips: Trip[], selectedCountries: string[]): Trip[] {
    if (!trips) {
      return [];
    }
    if (selectedCountries[0] == 'all' || selectedCountries.length === 0) {
      return trips;
    }
    return this.filterTripByCountry(trips, selectedCountries);
  }

}
