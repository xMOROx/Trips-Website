import { Component, OnInit } from '@angular/core';
import { Trip } from '../../Models/trip';
import { Title } from '@angular/platform-browser'
import { NgForm } from '@angular/forms'
import { TripsParseService } from 'src/app/services/tripsParse.service';
import { CurrenciesService } from 'src/app/services/currencies.service';
import { ICurrency } from 'src/app/Models/currency';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-add',
  templateUrl: './trip-add.component.html',
  styleUrls: ['./trip-add.component.css']
})



export class TripAddComponent implements OnInit {

  constructor(private titleService: Title, private tripsParseService: TripsParseService, private currenciesService: CurrenciesService, private routeService: Router) {

  }

  public selectedDefault: string = ""

  currencies!: ICurrency[];

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.setTitle("Dodawanie Wycieczki");
    this.currencies = this.currenciesService.getCurrencies;

  }
  handleSubmit(form: NgForm) {

    let trip: Trip = {
      name: form.value.floating_name,
      destinationCountry: form.value.floating_Country,
      startDate: form.value.floating_data_start,
      endDate: form.value.floating_data_end,
      unitPrice: form.value.floating_unit_price,
      maxPlace: form.value.floating_places,
      description: form.value.Description,
      imageSrc: form.value.floating_Image.split(','),
      amount: 0,
      currency: form.value.floating_currency,
      likes: 0,
      dislikes: 0
    } as Trip;

    this.tripsParseService.saveTrip(trip);

    this.routeService.navigate(['/trips']);

  }

}
