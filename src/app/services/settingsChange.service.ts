import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsChangeService {
  private refDatabase!: any;
  constructor
    (
      private fireDataBaseRef: AngularFireDatabase
    ) {

    this.refDatabase = fireDataBaseRef.list('settings');
  }

  public changeValueByKey(key: string, value: Object): void {
    this.refDatabase.update(`${key}`, value);
  }

  public getCurrency(): Observable<any> {
    return this.getValueByKey('currency');
  }

  public getPersistance(): Observable<any> {
    return this.getValueByKey('persistance');
  }

  private getValueByKey(key: string): Observable<any> {
    return this.fireDataBaseRef.object(`settings/${key}`).valueChanges();
  }
}
