import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faClock, faMinus, faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ISlide } from 'src/app/imageSlider/Models/ISlide';
import { ComponentsOfApplication } from 'src/app/Models/componentsOfApplication.enum';
import { INotification } from 'src/app/Models/Notification';
import { NotificationType } from 'src/app/Models/notificationType.enum';
import { IOpinion } from 'src/app/Models/Opinion';
import { Trip } from 'src/app/Models/trip';
import { TripStatus } from 'src/app/Models/tripStatus.enum';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/services/auth.service';
import { BoughtTripsService } from 'src/app/services/boughtTrips.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { RatingService } from 'src/app/services/rating.service';
import { ReservedTripsForUserService } from 'src/app/services/reservedTripsForUser.service';
import { SettingsChangeService } from 'src/app/services/settingsChange.service';
import { TripsParseService } from 'src/app/services/tripsParse.service';
@Component({
  selector: 'app-singleTrip',
  templateUrl: './singleTrip.component.html',
  styleUrls: ['./singleTrip.component.css']
})
export class SingleTripComponent implements OnInit {
  public user!: User;
  public trip!: Trip;
  public opinions: IOpinion[] = [];
  public slides: ISlide[] = [];

  public faPlus: IconDefinition = faPlus;
  public faClock: IconDefinition = faClock;
  public faMinus: IconDefinition = faMinus;

  private liked: boolean = false;
  public boughtByUser: boolean = false;

  public currency!: string;
  public key: string = "";
  public date: string = "";
  public nick: string = "";
  public tripName: string = "";
  public description: string = "";

  private subscription: Subscription | undefined


  constructor
    (
      public auth: AuthService,
      private route: ActivatedRoute,
      private settings: SettingsChangeService,
      private ratingService: RatingService,
      private tripsParseService: TripsParseService,
      private notificationsService: NotificationsService,
      private boughtTripsForUserService: BoughtTripsService,
      private reservedTripsForUserService: ReservedTripsForUserService,
    ) { }


  ngOnInit() {

    this.auth.userObservable().pipe(filter((res: any) => res)).subscribe((user: User) => {
      if (user) {
        this.user = user;
        this.nick = user.displayName;
      }
    });

    this.subscription = this.route.params.subscribe(data => {
      this.key = data['key'];
    });

    this.tripsParseService.getTripUrlByKey(this.key).subscribe(trip => {
      this.trip = trip;
      this.tripName = trip.name;
      this.reservedTripsForUserService.getReservedTripsForUser().pipe(filter((res: any) => res)).subscribe(tripReserved => {
        this.trip.amount = tripReserved.amount;
        this.trip.status = tripReserved.status;
      });

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

      this.boughtTripsForUserService.tripsObservable().pipe(filter((res: any) => res)).subscribe(trips => {
        if (trips.length > 0) {
          for (const trip of trips) {
            if (trip.oldKey === this.trip.key) {
              this.boughtByUser = true;
            }
          }
        }
      });
    });

    this.settings.getCurrency().subscribe(currency => {
      this.currency = currency.value;
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
      }
      trip.amount += 1;
      this.reservedTripsForUserService.setReservedTripsForUser(trip);
    }
  }

  public removeClick(trip: Trip): void {
    if (trip.amount >= 1) {
      trip.amount -= 1;
      if (trip.amount === 0) {
        trip.status = TripStatus.listed;
      }
      this.reservedTripsForUserService.setReservedTripsForUser(trip);
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
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
