import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Trip } from 'src/app/Models/trip';
import { faClock, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { TripsParseService } from 'src/app/services/tripsParse.service';
import { RatingService } from 'src/app/services/rating.service';
import { ISlide } from 'src/app/imageSlider/Models/ISlide';
import { IOpinion } from 'src/app/Models/IOpinion';
import { NotificationsService } from 'src/app/services/notifications.service';
import { INotification } from 'src/app/Models/INotification';
import { NotificationType } from 'src/app/Models/notificationType.enum';
import { TripStatus } from 'src/app/Models/tripStatus.enum';
import { ComponentsOfApplication } from 'src/app/Models/componentsOfApplication.enum';


@Component({
  selector: 'app-singleTrip',
  templateUrl: './singleTrip.component.html',
  styleUrls: ['./singleTrip.component.css']
})
export class SingleTripComponent implements OnInit {
  private liked: boolean = false;
  public key: string = "";
  public trip!: Trip;
  public faClock: any = faClock;
  public faPlus: any = faPlus;
  public faMinus: any = faMinus;

  public opinions: IOpinion[] = [];
  public slides: ISlide[] = [];
  public description: string = "";
  public date: string = "";
  public tripName: string = "";
  public nick: string = "";

  private subscription: Subscription | undefined


  constructor(private route: ActivatedRoute, private tripsParseService: TripsParseService, private ratingService: RatingService, private notificationsService: NotificationsService) { }


  ngOnInit() {
    this.subscription = this.route.params.subscribe(data => {
      this.key = data['key'];
    });

    this.tripsParseService.getTripUrlByKey(this.key).subscribe(trip => {
      this.trip = trip;

      if (this.slides.length < this.trip.imageSrc.length) {
        for (const image of this.trip.imageSrc) {
          this.slides.push({ url: image, title: this.trip.name });
        }
      }

      if (!this.liked) {
        this.ratingService.changeOpinionEventListener().subscribe(data => {
          if (data === 1) {
            this.trip.likes += 1;
          } else if (data === -1) {
            this.trip.dislikes += 1;
          }
          this.liked = true;
          this.tripsParseService.updateTrip(this.trip.key!, this.trip);
        });
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

  private sendError(title: string, description: string): INotification {
    return {
      title: title,
      description: description,
      type: NotificationType.error,
      date: new Date().toLocaleString(),
      from: ComponentsOfApplication.Single,
    };
  }

  private resetForm(): void {
    this.description = "";
    this.nick = "";
    this.date = "";
    this.tripName = "";
  }


  public addClick(trip: Trip): void {
    if (trip.amount < trip.maxPlace) {
      if (trip.status === TripStatus.listed) {
        trip.status = TripStatus.reserved;
        this.tripsParseService.updateTripSingleValue(trip.key!, { status: trip.status });

      }
      trip.amount += 1;
      this.tripsParseService.updateTripSingleValue(trip.key!, { amount: trip.amount });
    }
  }

  public removeClick(trip: Trip): void {
    if (trip.amount >= 1) {
      trip.amount -= 1;
      if (trip.amount === 0) {
        trip.status = TripStatus.listed;
        this.tripsParseService.updateTripSingleValue(trip.key!, { status: trip.status });
      }

      this.tripsParseService.updateTripSingleValue(trip.key!, { amount: trip.amount });
    }
  }


  public addOpinion(form: any): void {
    if (form.value.nick === "") {
      this.notificationsService.sendNotification(this.sendError("Brak nicku", "Podanie nicku jest wymagane aby wystawić opinie."));
      return;
    }

    if (form.value.trip_name === "") {
      this.notificationsService.sendNotification(this.sendError("Brak nazwy wycieczki", "Podanie nazwy wycieczki jest wymagane aby wystawić opinie."));
      return;
    }

    if (form.value.trip_name.toLowerCase() !== this.trip.name!.toLowerCase()) {
      this.notificationsService.sendNotification(this.sendError("Błąd nazwy wycieczki", `Podana nazwa wycieczki nie jest odpowiednia. Poprawna nazwa to: ${this.trip.name}`));
      return;
    }

    if (form.value.Description === "") {
      this.notificationsService.sendNotification(this.sendError("Brak opisu opini", "Podanie opisu opini jest wymagane aby wystawić opinie."));
      return;
    }

    if (form.value.Description.length < 50) {
      this.notificationsService.sendNotification(this.sendError("Za krótka opinia", "Opinia musi zawierać przynajmniej 50 znaków! "));
      return;
    }

    if (form.value.Description.length > 500) {
      this.notificationsService.sendNotification(this.sendError("Za długa opinia", "Opinia musi zawierać maksymalnie 500 znaków! "));
      return;
    }

    this.opinions.push({
      nick: form.value.nick,
      description: form.value.Description,
      date: form.value.date_buy
    } as IOpinion);

    this.notificationsService.clearErrorsFrom(ComponentsOfApplication.Single);

    this.resetForm();
  }

  public getCurrentDate(): String {
    return this.formatDate(new Date());
  }

  public onRemove(): void {
    this.tripsParseService.deleteTrip(this.trip.key!);
  }


  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe()
  }


}
