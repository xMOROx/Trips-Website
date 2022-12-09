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
import { map } from 'rxjs';

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

    this.tripsParseService.getTrips().snapshotChanges()
      .pipe(map((changes: any) => { return changes.map((c: any) => ({ key: c.payload.key, ...c.payload.val() })); }))
      .subscribe((trips: Trip[]) => {
        for (const trip of trips) {
          trip.status = TripStatus.listed;
        }

        this.trips = trips;
        this.cartService.addingPlaceEventListener().subscribe(cart => {
          this.cart = cart;
          this.setAmountForReservedTrip();
        });
      });

    this.filterService.filteredDataEventListener().subscribe(filter => {
      this.filter = filter;
    });
  }


  private setAmountForReservedTrip(): void {
    this.trips.forEach(trip => {
      this.cart.tripsReserved.forEach(tripReserved => {
        if (trip.key === tripReserved.key) {
          trip.amount = tripReserved.amount;
        }
      });
    });
  }

  public showFilter(): void {
    this.isActive = !this.isActive;
  }
}
