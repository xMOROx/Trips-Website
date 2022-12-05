import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trip } from 'src/app/Models/trip';
import { faClock, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { CartService } from 'src/app/services/cart.service';
import { TripsParseService } from 'src/app/services/tripsParse.service';
import { TripStatus } from 'src/app/Models/tripStatus.enum';

@Component({
  selector: 'app-detail-trip',
  templateUrl: './detail-trip.component.html',
  styleUrls: ['./detail-trip.component.css']
})
export class DetailTripComponent implements OnInit {

  @Input()
  public trip!: Trip;
  @Input()
  public trips!: Trip[];

  public faClock: any = faClock;
  public faPlus: any = faPlus;
  public faMinus: any = faMinus;

  private tripValue!: number[];

  constructor(private cartService: CartService, private tripParseService: TripsParseService) {
  }

  ngOnInit(): void {
  }

  private getPrice(trips: Trip[]): number[] {
    return Object.values(trips).map((trip) => {
      return trip.unitPrice;
    });
  }

  public getMaxPriceTrip(): number {
    this.tripValue = this.getPrice(this.trips);
    return Math.max(...this.tripValue);
  }

  public getMinPriceTrip(): number {
    this.tripValue = this.getPrice(this.trips);
    return Math.min(...this.tripValue);
  }


  public addClick(trip: Trip): void {
    if (trip.amount < trip.maxPlace) {
      if (trip.status === TripStatus.listed) {
        trip.status = TripStatus.reserved;
      }
      trip.amount += 1;
      this.cartService.emitEventAddingPlace(1, trip.currency, trip.unitPrice, trip);
    }
  }

  public removeClick(trip: Trip): void {
    if (trip.amount >= 1) {
      trip.amount -= 1;
      if (trip.amount === 0) {
        trip.status = TripStatus.listed;
      }
      this.cartService.emitEventAddingPlace(-1, trip.currency, -trip.unitPrice, trip);
    }
  }

  public onRemove(): void {
    this.tripParseService.emitTripRemover(this.trip);
  }

}
