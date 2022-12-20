import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Title } from '@angular/platform-browser';
import { faBars, IconDefinition } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow
  public faBars: IconDefinition = faBars;

  public zoom = 13;
  public center!: google.maps.LatLngLiteral;
  public options: google.maps.MapOptions = {
    mapTypeId: 'terrain',
    draggable: false,
    zoomControl: false,
    scrollwheel: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    disableDoubleClickZoom: true,
  };

  public optionsMarker: any = { animation: google.maps.Animation.DROP }

  public constructor(private titleService: Title) { }



  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.setTitle("Strona Główna");
    this.center = {
      lat: 33.7866,
      lng: -118.2987
    }
  }

  public openInfo(marker: MapMarker) {
    this.info.open(marker);
  }

}
