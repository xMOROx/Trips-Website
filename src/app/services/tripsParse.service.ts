import { Injectable } from '@angular/core';
import { Trip } from '../Models/trip';
import { TripJSON } from '../Models/tripJSON';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';

const JSON_URL = 'http://localhost:3000/Trips';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TripsParseService {
  private trip!: Trip;

  private removeTrip: BehaviorSubject<Trip> = new BehaviorSubject<Trip>(this.trip);

  constructor(private http: HttpClient) { }

  private changeToTripJSON(trip: Trip): TripJSON {
    return {
      "name": trip.name,
      "destinationCountry": trip.destinationCountry,
      "startDate": trip.startDate,
      "endDate": trip.endDate,
      "unitPrice": trip.unitPrice,
      "maxPlace": trip.maxPlace,
      "description": trip.description,
      "imageSrc": trip.imageSrc,
      "currency": trip.currency,
      "likes": trip.likes,
      "dislikes": trip.dislikes,
      "id": trip.id,
    } as TripJSON;
  }

  public getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(JSON_URL);
  }

  public saveTrip(trip: Trip): Observable<Object> {
    return this.http.post(JSON_URL, trip, httpOptions);
  }

  public deleteTrip(id: number) {
    this.http.delete(`${JSON_URL}/${id}`)
      .subscribe();
  }

  public updateTrip(id: number, trip: Trip) {
    let tripJSON: TripJSON = this.changeToTripJSON(trip);

    this.http.put(`${JSON_URL}/${id}`, tripJSON)
      .subscribe();
  }

  public getTripUrlById(id: number): Observable<Trip> {
    return this.http.get<Trip>(`${JSON_URL}/${id}`);
  }

  public emitTripRemover(trip: Trip): void {
    this.removeTrip.next(trip);
  }

  public tripListenerForRemove(): Observable<Trip> {
    return this.removeTrip.asObservable();
  }

}
