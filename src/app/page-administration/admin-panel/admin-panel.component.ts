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
  public faTasks: IconDefinition = faTasks;
  public faChartArea: IconDefinition = faChartArea;
  public faList: IconDefinition = faList;
  public faWallet: IconDefinition = faWallet;
  public faUsers: IconDefinition = faUsers;
  public faUserPlus: IconDefinition = faUserPlus;
  public faServer: IconDefinition = faServer;
  constructor(
    private titleService: Title,
    private router: Router
  ) { }

  ngOnInit() {
    this.titleService.setTitle(TITLE);
  }

}
