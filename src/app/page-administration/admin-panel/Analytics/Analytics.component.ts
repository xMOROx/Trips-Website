import { Component, OnInit } from '@angular/core';
import { faChartArea, faList, faServer, faTasks, faUserPlus, faUsers, faWallet, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Trip } from 'src/app/Models/trip';
import { AdminUsersService } from 'src/app/services/adminUsers.service';
import { AuthService } from 'src/app/services/auth.service';
import { BoughtTripsService } from 'src/app/services/boughtTrips.service';
import { SettingsChangeService } from 'src/app/services/settingsChange.service';

@Component({
  selector: 'app-Analytics',
  templateUrl: './Analytics.component.html',
  styleUrls: ['./Analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  public currency?: string;
  public revenue: number = 0;
  public numberOfUsers: number = 0;

  public faList: IconDefinition = faList;
  public faTasks: IconDefinition = faTasks;
  public faUsers: IconDefinition = faUsers;
  public faServer: IconDefinition = faServer;
  public faWallet: IconDefinition = faWallet;
  public faUserPlus: IconDefinition = faUserPlus;
  public faChartArea: IconDefinition = faChartArea;

  constructor(
    private adminUsersService: AdminUsersService,
    private boughtTripsService: BoughtTripsService,
    private settingsService: SettingsChangeService,
  ) { }

  ngOnInit() {
    this.boughtTripsService.allBoughtTrips.subscribe((res: any) => {
      this.revenue = this.calculateTotalPrice(res);
    });

    this.settingsService.getCurrency().subscribe(currency => {
      this.currency = currency.value;
    });

    this.adminUsersService.users.subscribe((res: any) => {
      this.numberOfUsers = res.length;
    });
  }

  public calculateTotalPrice(trips: any): number {
    let totalPrice = 0;
    for (const userTrips of trips) {
      for (const key of Object.keys(userTrips)) {
        totalPrice += (userTrips[key]['unitPrice'] * userTrips[key]['amount']);
      }
    }
    return totalPrice;
  }

}
