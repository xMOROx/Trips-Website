import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Trip } from 'src/app/Models/trip';
import { faClock, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { CartService } from 'src/app/services/cart.service';
import { TripsParseService } from 'src/app/services/tripsParse.service';
import { RatingService } from 'src/app/services/rating.service';
import { ICart } from 'src/app/Models/cart';


@Component({
  selector: 'app-singleTrip',
  templateUrl: './singleTrip.component.html',
  styleUrls: ['./singleTrip.component.css']
})
export class SingleTripComponent implements OnInit {

  public id = -1;
  public trip!: Trip;
  public faClock: any = faClock;
  public faPlus: any = faPlus;
  public faMinus: any = faMinus;
  public cart: ICart = {
    reservedTotalAmount: 0,
    priceTotalAmount: [0],
    tripsReserved: []
  };


  private subscription: Subscription | undefined


  constructor(private route: ActivatedRoute, private tripsParseService: TripsParseService, private cartService: CartService, private ratingService: RatingService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(data => {
      this.id = data['id'];
    });
    this.tripsParseService.getTripUrlById(this.id).subscribe(trip => {
      this.trip = trip;
      this.trip.amount = 0;
      this.cartService.addingPlaceEventListener().subscribe(info => {
        this.cart = info;
        this.setAmountForReservedTrip();
      });
    });


    this.ratingService.changeOpinionEventListener().subscribe(data => {
      if (data === 1) {
        this.trip.likes += 1;
      } else if (data === -1) {
        this.trip.dislikes += 1;
      }
      this.tripsParseService.updateTrip(this.trip.id, this.trip);

    });

  }

  private setAmountForReservedTrip(): void {
    this.cart.tripsReserved.forEach(tripReserved => {
      if (this.trip.id === tripReserved.id) {
        this.trip.amount = tripReserved.amount;
      }
    });
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
    // this.removeTrip.emit(this.trip);
  }


  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe()
  }


}
