import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Currencies } from '../Models/Currencies.enum';
import { SettingsChangeService } from '../services/settingsChange.service';

@Component({
  selector: 'app-pageSettings',
  templateUrl: './pageSettings.component.html',
  styleUrls: ['./pageSettings.component.css']
})
export class PageSettingsComponent implements OnInit {
  public currenciesArray: string[] = [];
  public selectedCurrency!: string;
  constructor(private titleService: Title, private settings: SettingsChangeService) { }

  ngOnInit() {
    this.titleService.setTitle("Ustawienia");
    this.currenciesArray = Object.values(Currencies);
    this.settings.getCurrency().subscribe((currency: string) => {
      this.selectedCurrency = currency;
    });
  }

  public onCurrencyChange(event: any) {
    this.settings.changeCurrency(this.selectedCurrency);
  }
}

