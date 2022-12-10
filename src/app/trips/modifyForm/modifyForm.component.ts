import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TripsParseService } from 'src/app/services/tripsParse.service';

@Component({
  selector: 'app-modifyForm',
  templateUrl: './modifyForm.component.html',
  styleUrls: ['./modifyForm.component.css']
})
export class ModifyFormComponent implements OnInit {

  public namePassed: string = "";
  public descriptionPassed: string = "";
  public dateStartPassed: string = "";
  public dateEndPassed: string = "";
  public countryPassed: string = "";
  public unitPricePassed: number = 0;
  public placesPassed: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private matDialogRef: MatDialogRef<ModifyFormComponent>, private tripsParseService: TripsParseService) { }



  ngOnInit() {
    this.setToDefault();
  }

  public closeDialog(): void {
    this.matDialogRef.close();
  }

  public handleSubmit(): void {
    this.tripsParseService.updateTripSingleValue(this.data.trip.key!, {
      name: this.namePassed,
      description: this.descriptionPassed,
      startDate: this.dateStartPassed,
      endDate: this.dateEndPassed,
      destinationCountry: this.countryPassed,
      unitPrice: this.unitPricePassed,
      maxPlace: this.placesPassed,
    });
    this.closeDialog()
  }

  public setToDefault(): void {
    this.namePassed = this.data.trip.name;
    this.descriptionPassed = this.data.trip.description;
    this.dateStartPassed = this.data.trip.startDate;
    this.dateEndPassed = this.data.trip.endDate;
    this.countryPassed = this.data.trip.destinationCountry;
    this.unitPricePassed = this.data.trip.unitPrice;
    this.placesPassed = this.data.trip.maxPlace;
  }

  ngOnDestroy() {
    this.closeDialog();
  }

}
