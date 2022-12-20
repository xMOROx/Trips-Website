import { Component, OnInit } from '@angular/core';
import { faChartArea, faList, faServer, faTasks, faUserPlus, faUsers, faWallet, IconDefinition } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-Analytics',
  templateUrl: './Analytics.component.html',
  styleUrls: ['./Analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  public faTasks: IconDefinition = faTasks;
  public faChartArea: IconDefinition = faChartArea;
  public faList: IconDefinition = faList;
  public faWallet: IconDefinition = faWallet;
  public faUsers: IconDefinition = faUsers;
  public faUserPlus: IconDefinition = faUserPlus;
  public faServer: IconDefinition = faServer;


  constructor() { }

  ngOnInit() {


  }

}
