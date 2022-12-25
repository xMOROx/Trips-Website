import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { faFilter, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';
import { FiltersComponent } from 'src/app/filters/filters.component';
import { Currencies } from 'src/app/Models/Currencies.enum';
import { IFilter } from 'src/app/Models/filter';
import { Trip } from 'src/app/Models/trip';
import { TripStatus } from 'src/app/Models/tripStatus.enum';
import { FiltersService } from 'src/app/services/filters.service';
import { ReservedTripsForUserService } from 'src/app/services/reservedTripsForUser.service';
import { TripsParseService } from 'src/app/services/tripsParse.service';

@Component({
  selector: 'app-list-trips',
  templateUrl: './list-trips.component.html',
  styleUrls: ['./list-trips.component.css']
})
export class ListTripsComponent implements OnInit {

  public trips!: Trip[];
  public filter!: IFilter;
  public faFilter: IconDefinition = faFilter;
  public currency: Currencies = Currencies.PLN;

  public isActive: boolean = false;
  public reservedTotalAmount: number = 0;

  public constructor(
    private titleService: Title,
    private MatDialog: MatDialog,
    private sso: ScrollStrategyOptions,
    private filterService: FiltersService,
    private tripsParseService: TripsParseService,
    private reservedTripsForUserService: ReservedTripsForUserService,
  ) { }

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }


  ngOnInit(): void {
    this.setTitle("Wycieczki");

    this.tripsParseService.getTrips().snapshotChanges()
      .pipe(map((changes: any) => { return changes.map((c: any) => ({ key: c.payload.key, ...c.payload.val() })); }))
      .subscribe((trips: Trip[]) => {
        this.trips = trips.filter(trip => trip.maxPlace > 0);
        this.reservedTripsForUserService.getReservedTripsForUser().subscribe((tripsReserved: Trip[]) => {
          for (const trip of this.trips) {
            for (const reservedTrip of tripsReserved) {
              if (trip.key === reservedTrip.key) {
                trip.status = TripStatus.reserved;
                trip.amount = reservedTrip.amount;
              }
            }
          }
        });
      });

    this.reservedTripsForUserService.getAmountOfReservedTripsForUser().subscribe((amount: number) => {
      this.reservedTotalAmount = amount;
    });


    this.filterService.filteredDataEventListener().subscribe(filter => {
      this.filter = filter;
    });
  }

  public openFilterDialog(): void {
    this.MatDialog.open(FiltersComponent, {
      width: '100vw',
      height: '80vh',
      scrollStrategy: this.sso.noop(),
    });
  }

  public showFilter(): void {
    this.isActive = !this.isActive;
  }
}
