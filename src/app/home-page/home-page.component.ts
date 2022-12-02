import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faBars, IconDefinition } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public faBars: IconDefinition = faBars;

  public constructor(private titleService: Title) { }



  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.setTitle("Strona Główna");
  }


}
