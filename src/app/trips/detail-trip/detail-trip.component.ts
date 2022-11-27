import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trip } from 'src/app/Models/trip';
import { faClock, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { CartService } from 'src/app/services/cart.service';

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
  @Output()
  public removeTrip: EventEmitter<any> = new EventEmitter();
  @Output()
  public updateTrip: EventEmitter<any> = new EventEmitter();



  public faClock: any = faClock;
  public faPlus: any = faPlus;
  public faMinus: any = faMinus;

  private tripValue!: number[];

  constructor(private cartService: CartService) {
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

  public ratingEventHandler(trip: Trip, event: any): void {
    if (event == 1) {
      trip.likes += 1
    } else {
      trip.dislikes += 1
    }
    this.updateTrip.emit(trip);
  }

  public addClick(trip: Trip): void {
    if (trip.amount < trip.maxPlace) {
      trip.amount += 1
      this.cartService.emitEventAddingPlace(1, trip.currency, trip.unitPrice, trip);
    }
  }

  public removeClick(trip: Trip): void {
    if (trip.amount >= 1) {
      trip.amount -= 1
      this.cartService.emitEventAddingPlace(-1, trip.currency, -trip.unitPrice, trip);
    }
  }

  public onRemove(): void {
    this.removeTrip.emit(this.trip);
  }

}
