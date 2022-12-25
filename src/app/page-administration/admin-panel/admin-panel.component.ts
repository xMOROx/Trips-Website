import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faChartArea, faList, faServer, faTasks, faUserPlus, faUsers, faWallet, IconDefinition } from '@fortawesome/free-solid-svg-icons';

const TITLE = "Panel administratora";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  public faList: IconDefinition = faList;
  public faTasks: IconDefinition = faTasks;
  public faUsers: IconDefinition = faUsers;
  public faWallet: IconDefinition = faWallet;
  public faServer: IconDefinition = faServer;
  public faUserPlus: IconDefinition = faUserPlus;
  public faChartArea: IconDefinition = faChartArea;
  constructor
    (
      private titleService: Title,
    ) { }

  ngOnInit() {
    this.titleService.setTitle(TITLE);
  }
}
