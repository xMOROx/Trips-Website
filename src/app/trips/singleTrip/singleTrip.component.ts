import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Trip } from 'src/app/Models/trip';
import { faClock, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { CartService } from 'src/app/services/cart.service';
import { TripsParseService } from 'src/app/services/tripsParse.service';
import { RatingService } from 'src/app/services/rating.service';
import { ICart } from 'src/app/Models/cart';
import { ISlide } from 'src/app/imageSlider/Models/ISlide';
import { IOpinion } from 'src/app/Models/IOpinion';


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
  public errors: string[] = [];
  public opinions: IOpinion[] = [];
  public slides: ISlide[] = [];


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
      for (const image of this.trip.ImageSrc) {
        this.slides.push({ url: image, title: this.trip.name });
      }
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

  private formatDate(date: Date): string {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
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
