import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faClock, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Trip } from 'src/app/Models/trip';
import { TripStatus } from 'src/app/Models/tripStatus.enum';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/services/auth.service';
import { ReservedTripsForUserService } from 'src/app/services/reservedTripsForUser.service';
import { SettingsChangeService } from 'src/app/services/settingsChange.service';
import { TripsParseService } from 'src/app/services/tripsParse.service';
import { ModifyFormComponent } from '../../modifyForm/modifyForm.component';

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
  @Input()
  public insideAdminPanel: boolean = false;

  public faClock: any = faClock;
  public faPlus: any = faPlus;
  public faMinus: any = faMinus;

  private tripValue!: number[];

  public currency!: string;

  public user!: User;

  constructor(
    private tripsParseService: TripsParseService,
    private settings: SettingsChangeService,
    private MatDialog: MatDialog,
    private sso: ScrollStrategyOptions,
    private reservedTripsForUserService: ReservedTripsForUserService,
    public auth: AuthService,

  ) {

  }

  ngOnInit(): void {
    this.settings.getCurrency().subscribe((currency: any) => {
      this.currency = currency.value;
    });

    this.auth.user.subscribe((user: User) => {
      if (user) {
        this.user = user;
      }
    });

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

  public onRemove(): void {
    if (this.auth.canDelete(this.user)) {
      this.tripsParseService.deleteTrip(this.trip.key!);
    }
  }

  public modifyTrip(): void {
    if (this.auth.canEdit(this.user)) {
      this.MatDialog.open(ModifyFormComponent, {
        width: '80vw',
        scrollStrategy: this.sso.noop(),
        autoFocus: false,
        data: {
          trip: this.trip
        }
      });
    }
  }


}
