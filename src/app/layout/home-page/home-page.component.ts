import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Title } from '@angular/platform-browser';
import { faBars, IconDefinition } from '@fortawesome/free-solid-svg-icons';

const TITLE = 'Strona Główna';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow
  private latitude: number = 33.7866;
  private longitude: number = -118.2987;

  public zoom: number = 13;
  public faBars: IconDefinition = faBars;
  public center!: google.maps.LatLngLiteral;
  public options: google.maps.MapOptions = {
    draggable: false,
    zoomControl: false,
    scrollwheel: false,
    mapTypeId: 'terrain',
    rotateControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    disableDoubleClickZoom: true,
  };

  public optionsMarker: any = { animation: google.maps.Animation.DROP }

  public constructor(private titleService: Title) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.setTitle(TITLE);
    this.center = {
      lat: this.latitude,
      lng: this.longitude
    }
  }

  public openInfo(marker: MapMarker) {
    this.info.open(marker);
  }
}
