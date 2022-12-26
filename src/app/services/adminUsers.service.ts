import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from '../Models/User';


@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  private refDatabase!: any;

  constructor
    (
      private fireDataBaseRef: AngularFireDatabase
    ) {
    this.refDatabase = fireDataBaseRef.list('Users');
  }

  public get users(): any {
    return this.fireDataBaseRef.list('Users').valueChanges();
  }

  public deleteUser(key: string) {
    this.refDatabase.remove(key);
  }

  public updateUser(key: string, user: User) {
    this.fireDataBaseRef.database.ref('Users').child(key).update(user);
  }

  public updateUserByValue(key: string, value: Object) {
    this.fireDataBaseRef.database.ref('Users').child(key).update(value);
  }

  public updateUserRolesByValue(key: string, value: Object) {
    this.fireDataBaseRef.database.ref('Users').child(key).child('roles').update(value);
  }

  public getUserUrlByKey(key: string): any {
    return this.fireDataBaseRef.object(`Users/${key}`).valueChanges();
  }

}
