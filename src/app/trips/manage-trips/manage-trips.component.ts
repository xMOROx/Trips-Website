import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faArrowDown, faArrowUp, faList, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { filter, map } from 'rxjs/operators';
import { TripStatus } from 'src/app/Models/tripStatus.enum';
import { ReservedTripsForUserService } from 'src/app/services/reservedTripsForUser.service';
import { TripsParseService } from 'src/app/services/tripsParse.service';
import { Trip } from '../../Models/trip';
@Component({
  selector: 'app-manage-trips',
  templateUrl: './manage-trips.component.html',
  styleUrls: ['./manage-trips.component.css']
})
export class ManageTripsComponent implements OnInit {

  constructor
    (
      private titleService: Title,
      private tripsParseService: TripsParseService,
      private reservedTripsForUserService: ReservedTripsForUserService,
      private routeService: Router
    ) { }

  public selectedDefault: string = ""
  public trips!: Trip[];
  public faList = faList;
  public faArrowUp = faArrowUp;
  public faArrowDown = faArrowDown;
  public faPlus = faPlusSquare;

  @ViewChild('tripsList') public tripsList!: ElementRef<HTMLElement>;
  @ViewChild('addTrip') public addTrip!: ElementRef<HTMLElement>;


  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.setTitle("Zarządzanie Wycieczkami");

    this.tripsParseService.getTrips().snapshotChanges()
      .pipe(map((changes: any) => { return changes.map((c: any) => ({ key: c.payload.key, ...c.payload.val() })); }))
      .subscribe((trips: Trip[]) => {
        this.trips = trips.filter(trip => trip.maxPlace > 0);
        this.reservedTripsForUserService.getReservedTripsForUser().pipe(filter((res: any) => res)).subscribe((tripsReserved: Trip[]) => {
          for (const trip of this.trips) {
            for (const reservedTrip of tripsReserved) {
              if (trip.key === reservedTrip.key) {
                trip.status = TripStatus.reserved;
                trip.amount = reservedTrip.amount;
              }
            }
          }
        });
      });
  }

  handleSubmit(form: NgForm) {
    let trip: Trip = {
      name: form.value.floating_name,
      destinationCountry: form.value.floating_Country,
      startDate: form.value.floating_data_start,
      endDate: form.value.floating_data_end,
      unitPrice: form.value.floating_unit_price,
      maxPlace: form.value.floating_places,
      description: form.value.Description,
      imageSrc: form.value.floating_Image.split(','),
      amount: 0,
      likes: 0,
      dislikes: 0
    } as Trip;

    this.tripsParseService.saveTrip(trip);

    this.routeService.navigate(['/trips']);
  }

  public scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  public scrollToElement(element: HTMLElement) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
