import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Trip } from 'src/app/Models/trip';
import { TripsParseService } from 'src/app/services/tripsParse.service';
import { faFilter, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FiltersService } from 'src/app/services/filters.service';
import { IFilter } from 'src/app/Models/filter';
import { map } from 'rxjs';
import { Currencies } from 'src/app/Models/Currencies.enum';
import { MatDialog } from '@angular/material/dialog';
import { FiltersComponent } from 'src/app/filters/filters.component';
import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';

@Component({
  selector: 'app-list-trips',
  templateUrl: './list-trips.component.html',
  styleUrls: ['./list-trips.component.css']
})
export class ListTripsComponent implements OnInit {

  public trips!: Trip[];
  public reservedTotalAmount = 0;


  public filter!: IFilter;
  public faFilter: IconDefinition = faFilter;
  public isActive: boolean = false;
  public currency: Currencies = Currencies.PLN;

  public constructor(private titleService: Title, private tripsParseService: TripsParseService, private filterService: FiltersService, private MatDialog: MatDialog, private sso: ScrollStrategyOptions) {
  }

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }


  ngOnInit(): void {
    this.setTitle("Wycieczki");

    this.tripsParseService.getTrips().snapshotChanges()
      .pipe(map((changes: any) => { return changes.map((c: any) => ({ key: c.payload.key, ...c.payload.val() })); }))
      .subscribe((trips: Trip[]) => {
        this.trips = trips.filter(trip => trip.maxPlace > 0);
      });

    this.tripsParseService.getAmountOfReservedTrips().subscribe(value => {
      this.reservedTotalAmount = value;
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
