import { Component, OnInit } from '@angular/core';
import { faTasks, faChartArea, faList, faWallet, faUsers, faUserPlus, faServer, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

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
