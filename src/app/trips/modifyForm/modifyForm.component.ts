import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TripsParseService } from 'src/app/services/tripsParse.service';

@Component({
  selector: 'app-modifyForm',
  templateUrl: './modifyForm.component.html',
  styleUrls: ['./modifyForm.component.css']
})
export class ModifyFormComponent implements OnInit {

  public namePassed: string = "";
  public placesPassed: number = 0;
  public dateEndPassed: string = "";
  public countryPassed: string = "";
  public dateStartPassed: string = "";
  public unitPricePassed: number = 0;
  public descriptionPassed: string = "";

  constructor
    (
      @Inject(MAT_DIALOG_DATA) public data: any,
      private tripsParseService: TripsParseService,
      private matDialogRef: MatDialogRef<ModifyFormComponent>,
    ) { }



  ngOnInit() {
    this.setToDefault();
  }

  public closeDialog(): void {
    this.matDialogRef.close();
  }

  public handleSubmit(): void {
    this.tripsParseService.updateTripSingleValue(this.data.trip.key!, {
      name: this.namePassed,
      endDate: this.dateEndPassed,
      maxPlace: this.placesPassed,
      startDate: this.dateStartPassed,
      unitPrice: this.unitPricePassed,
      description: this.descriptionPassed,
      destinationCountry: this.countryPassed,
    });
    this.closeDialog()
  }

  public setToDefault(): void {
    this.namePassed = this.data.trip.name;
    this.dateEndPassed = this.data.trip.endDate;
    this.placesPassed = this.data.trip.maxPlace;
    this.dateStartPassed = this.data.trip.startDate;
    this.unitPricePassed = this.data.trip.unitPrice;
    this.descriptionPassed = this.data.trip.description;
    this.countryPassed = this.data.trip.destinationCountry;
  }

  ngOnDestroy() {
    this.closeDialog();
  }

}
