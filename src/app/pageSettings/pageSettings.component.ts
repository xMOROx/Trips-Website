import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Currencies } from '../Models/Currencies.enum';
import { SessionOptions } from '../Models/sessionOptions.enum';
import { SettingsChangeService } from '../services/settingsChange.service';

@Component({
  selector: 'app-pageSettings',
  templateUrl: './pageSettings.component.html',
  styleUrls: ['./pageSettings.component.css']
})
export class PageSettingsComponent implements OnInit {
  public currenciesArray: string[] = [];
  public persistanceArray: string[] = [];
  public selectedCurrency!: string;
  public selectedPersistance!: string;
  constructor(private titleService: Title, private settings: SettingsChangeService) { }

  ngOnInit() {
    this.titleService.setTitle("Ustawienia");
    this.currenciesArray = Object.values(Currencies);
    this.persistanceArray = Object.values(SessionOptions);
    this.settings.getCurrency().subscribe((currency: any) => {
      this.selectedCurrency = currency.value;
    });
    this.settings.getPersistance().subscribe((persistance: any) => {
      this.selectedPersistance = persistance.value;
    });
  }

  public onCurrencyChange(_: any) {
    this.settings.changeValueByKey('currency', { value: this.selectedCurrency });
  }
  public onPersistanceChange(_: any) {
    this.settings.changeValueByKey('persistance', { value: this.selectedPersistance });
  }
}

