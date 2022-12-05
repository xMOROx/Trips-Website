import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Trip } from 'src/app/Models/trip';
import { TripsParseService } from 'src/app/services/tripsParse.service';
import { CartService } from 'src/app/services/cart.service';
import { ICart } from 'src/app/Models/cart';
import { faFilter, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FiltersService } from 'src/app/services/filters.service';
import { IFilter } from 'src/app/Models/filter';
import { TripStatus } from 'src/app/Models/tripStatus.enum';

@Component({
  selector: 'app-list-trips',
  templateUrl: './list-trips.component.html',
  styleUrls: ['./list-trips.component.css']
})
export class ListTripsComponent implements OnInit {

  public trips!: Trip[];
  public cart: ICart = {
    reservedTotalAmount: 0,
    priceTotalAmount: [0],
    tripsReserved: []
  };

  public filter!: IFilter;
  public faFilter: IconDefinition = faFilter;
  public isActive: boolean = false;

  public constructor(private titleService: Title, private tripsParseService: TripsParseService, private cartService: CartService, private filterService: FiltersService) {
  }

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }


  ngOnInit(): void {
    this.setTitle("Wycieczki");

    this.tripsParseService.getTrips().subscribe((trips: Trip[]) => {
      for (const trip of trips) {
        trip.amount = 0;
        trip.status = TripStatus.listed;
      }
      this.trips = trips;
      this.cartService.addingPlaceEventListener().subscribe(info => {
        this.cart = info;
        this.setAmountForReservedTrip();
      });
    });
    this.filterService.filteredDataEventListener().subscribe(data => {
      this.filter = data;
    });

    this.tripsParseService.tripListenerForRemove().subscribe(trip => {
      this.handleRemoveTrip(trip);
    })
  }

  public handleRemoveTrip(event: Trip): void {
    this.trips = this.trips.filter((trip) => {
      return trip !== event;
    });
    //? this.TripsParseService.deleteTrip(event.id);  Implementation for future database 

  }


  private setAmountForReservedTrip(): void {
    this.trips.forEach(trip => {
      this.cart.tripsReserved.forEach(tripReserved => {
        if (trip.id === tripReserved.id) {
          trip.amount = tripReserved.amount;
        }
      });
    });
  }

  public showFilter(): void {
    this.isActive = !this.isActive;
  }
}
