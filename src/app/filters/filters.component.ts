import { Component, OnInit } from '@angular/core';
import { IStar } from '../Models/star';
import { Trip } from '../Models/trip';
import { Router } from '@angular/router';
import { FiltersService } from '../services/filters.service';
import { TripsParseService } from '../services/tripsParse.service';
import { IFilter } from '../Models/filter';
import { map } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  public trips!: Trip[];

  public filter!: IFilter;

  public stars = [
    { name: "5", value: 90 },
    { name: "4", value: 80 },
    { name: "3", value: 60 },
    { name: "2", value: 40 },
    { name: "1", value: 20 }
  ]


  constructor(private tripsParserService: TripsParseService, private filterService: FiltersService, private routeService: Router, private matDialogRef: MatDialogRef<FiltersComponent>) { }

  ngOnInit() {
    this.tripsParserService.getTrips().snapshotChanges().pipe(map((changes: any) => { return changes.map((c: any) => ({ key: c.payload.key, ...c.payload.val() })); })).subscribe((data: Trip[]) => {
      this.trips = data;
    });

    this.filterService.filteredDataEventListener().subscribe((data) => {
      this.filter = data;
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

  private createStars(oneStar: boolean, twoStars: boolean, threeStars: boolean, fourStars: boolean, fiveStars: boolean): IStar[] {
    let starsValue: IStar[] = [
      { startValue: 0, endValue: 0 },
      { startValue: 0, endValue: 0 },
      { startValue: 0, endValue: 0 },
      { startValue: 0, endValue: 0 },
      { startValue: 0, endValue: 0 }
    ];

    if (oneStar) {
      starsValue[0].startValue = 20;
      starsValue[0].endValue = 39;

    }
    if (twoStars) {
      starsValue[1].startValue = 40;
      starsValue[1].endValue = 59;
    }
    if (threeStars) {
      starsValue[2].startValue = 60;
      starsValue[2].endValue = 79;
    }
    if (fourStars) {
      starsValue[3].startValue = 80;
      starsValue[3].endValue = 89;
    }
    if (fiveStars) {
      starsValue[4].startValue = 90;
      starsValue[4].endValue = 100;
    }

    return starsValue;
  }

  public getMinimumPrice(): number {
    let minValue: number = 9999;
    for (const index in this.trips) {
      minValue = Math.min(this.trips[index].unitPrice, minValue);
    }
    return minValue;
  }

  public getMaximumPrice(): number {
    let maxValue: number = -1;
    for (const index in this.trips) {
      maxValue = Math.max(this.trips[index].unitPrice, maxValue);
    }
    return maxValue;
  }

  public getMinimumDate(): string {
    let minimumDate: Date = new Date("3001-01-01");
    for (const index in this.trips) {
      if (new Date(this.trips[index].startDate) < minimumDate) {
        minimumDate = new Date(this.trips[index].startDate);
      }
    }
    return this.formatDate(minimumDate);
  }

  public getMaximumDate(): string {
    let maximumDate: Date = new Date("1970-01-01");
    for (const index in this.trips) {
      if (new Date(this.trips[index].endDate) > maximumDate) {
        maximumDate = new Date(this.trips[index].endDate);
      }
    }

    return this.formatDate(maximumDate);
  }


  public handleSumbit(form: any): void {

    let stars = this.createStars(form.value.checkbox1, form.value.checkbox2, form.value.checkbox3, form.value.checkbox4, form.value.checkbox5);

    this.filterService.emitEventFilteredData(form.value.Countries, form.value.minimumPrice
      , form.value.maximumPrice, form.value.startDate, form.value.endDate, stars);
    // this.routeService.navigate(['/trips']);
    this.matDialogRef.close();
  }
  public closeDialog(): void {
    this.matDialogRef.close();
  }

  ngOnDestroy() {
    this.matDialogRef.close();
  }

}
