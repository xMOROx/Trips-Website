import { Component, OnInit } from '@angular/core';
import { faChartArea, faList, faServer, faTasks, faUserPlus, faUsers, faWallet, IconDefinition } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-Analytics',
  templateUrl: './Analytics.component.html',
  styleUrls: ['./Analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  public faList: IconDefinition = faList;
  public faTasks: IconDefinition = faTasks;
  public faUsers: IconDefinition = faUsers;
  public faServer: IconDefinition = faServer;
  public faWallet: IconDefinition = faWallet;
  public faUserPlus: IconDefinition = faUserPlus;
  public faChartArea: IconDefinition = faChartArea;

  constructor() { }

  ngOnInit() {
  }
}
