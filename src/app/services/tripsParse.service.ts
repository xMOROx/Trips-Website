import { Injectable } from '@angular/core';
import { Trip } from '../Models/trip';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { TripStatus } from '../Models/tripStatus.enum';


@Injectable({
  providedIn: 'root'
})
export class TripsParseService {
  private refDatabase!: any;
  private subject: Subject<number> = new Subject<number>();

  constructor(private fireDataBaseRef: AngularFireDatabase) {
    this.refDatabase = fireDataBaseRef.list('Trips');
  }


  public getTrips(): any {
    return this.refDatabase;
  }

  public saveTrip(trip: Trip): void {
    const key = this.fireDataBaseRef.database.ref('Trips').push().key!;
    trip.key = key;
    trip.status = TripStatus.listed;
    this.fireDataBaseRef.database.ref('Trips').child(key).set(trip);
  }

  public deleteTrip(key: string) {
    this.refDatabase.remove(key);
  }

  public updateTrip(key: string, trip: Trip) {
    this.fireDataBaseRef.database.ref('Trips').child(key).set(trip);
  }

  public getTripUrlByKey(key: string): Observable<any> {
    return this.fireDataBaseRef.object(`Trips/${key}`).valueChanges();
  }

  public updateTripSingleValue(key: string, value: Object) {
    this.fireDataBaseRef.database.ref('Trips').child(key).update(value);
  }

  public getAmountOfReservedTrips(): Observable<number> {
    this.getTrips().valueChanges().subscribe((trips: Trip[]) => {
      let amount = 0;
      for (const trip of trips) {
        if (trip.status === TripStatus.reserved) {
          amount += trip.amount;
        }
      }
      this.subject.next(amount);
    });
    return this.subject.asObservable();
  }

}
