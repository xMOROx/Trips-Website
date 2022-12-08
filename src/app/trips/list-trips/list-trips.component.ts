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
import { BoughtTripsService } from 'src/app/services/boughtTrips.service';

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

  public boughtTrips: Trip[] = []; //TODO REMOVE

  public filter!: IFilter;
  public faFilter: IconDefinition = faFilter;
  public isActive: boolean = false;

  public constructor(private titleService: Title, private tripsParseService: TripsParseService, private cartService: CartService, private filterService: FiltersService, private boughtTripsService: BoughtTripsService) {
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

      //TODO remove this when trips will be stored inside data base 
      this.boughtTripsService.getBoughtTrips().subscribe(boughtTrips => {
        this.boughtTrips = boughtTrips;
        this.trips.forEach(trip => {
          this.boughtTrips.forEach(boughtTrip => {
            if (boughtTrip.id === trip.id) {
              trip.maxPlace -= boughtTrip.amount;
            }
          });
          if (trip.maxPlace <= 0) {
            this.handleRemoveTrip(trip);
          }
        });
      });


      //TODO REMOVE

      this.cartService.addingPlaceEventListener().subscribe(cart => {
        this.cart = cart;
        this.setAmountForReservedTrip();
      });


    });

    this.filterService.filteredDataEventListener().subscribe(filter => {
      this.filter = filter;
    });

    this.tripsParseService.tripListenerForRemove().subscribe(trip => {
      this.handleRemoveTrip(trip);
    });
    // this.boughtTripsService.sendReminderNotificationForAll();
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
