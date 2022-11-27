import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Trip } from 'src/app/Models/trip';
import { TripsParseService } from 'src/app/services/tripsParse.service';
import { CartService } from 'src/app/services/cart.service';
import { ICart } from 'src/app/Models/cart';
import { faFilter, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FiltersService } from 'src/app/services/filters.service';
import { IFilter } from 'src/app/Models/filter';

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

  public constructor(private titleService: Title, private TripsParseService: TripsParseService, private cartService: CartService, private filterService: FiltersService) {


  }

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }


  ngOnInit(): void {
    this.setTitle("Wycieczki");
    this.TripsParseService.getTrips().subscribe((data: Trip[]) => {
      data.forEach(el => el.amount = 0)
      this.trips = data;
      this.cartService.addingPlaceEventListener().subscribe(info => {
        this.cart = info;
        this.setAmountForReservedTrip();
      });
    });
    this.filterService.filteredDataEventListener().subscribe(data => {
      this.filter = data;
    })
  }

  public handleRemoveTrip(event: Trip): void {
    this.trips = this.trips.filter((trip) => {
      return trip !== event;
    })

    //? this.TripsParseService.deleteTrip(event.id);  Implementation for future database 

  }

  public handleUpdateTrip(event: Trip): void {
    this.TripsParseService.updateTrip(event.id, event)
  }

  private setAmountForReservedTrip(): void {

    this.trips.forEach(trip => {
      this.cart.tripsReserved.forEach(tripReserved => {
        if (trip.id === tripReserved.id) {
          trip.amount = tripReserved.amount;
        }
      })
    });
  }

  public showFilter(): void {
    this.isActive = !this.isActive;

  }
}
