import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { User } from '../Models/User';
import { ReservedTripsForUserService } from './reservedTripsForUser.service';
import { SettingsChangeService } from './settingsChange.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);


  constructor
    (
      private router: Router,
      private settings: SettingsChangeService,
      private angularFireAuth: AngularFireAuth,
      private angularFireDatabase: AngularFireDatabase,
      private reservedTripsForUserService: ReservedTripsForUserService
    ) {

    this.angularFireAuth.authState
      .pipe(switchMap(user => user ? this.angularFireDatabase.object(`Users/${user.uid}`).valueChanges() : of(false)))
      .subscribe(userData => this.userSubject.next(userData));
  }

  public get user() {
    return this.userSubject.value;
  }

  public userObservable(): Observable<any> {
    return this.userSubject.asObservable();
  }

  public updateUserData(user: User): void {
    this.angularFireDatabase.object(`Users/${user.uid}`).update(user);
  }

  public signIn(email: string, password: string): void {
    this.settings.getPersistance().subscribe((persistance: any) => {
      this.angularFireAuth.setPersistence(persistance.value).then(() => {
        this.angularFireAuth.signInWithEmailAndPassword(email, password)
          .then(_ => {
            this.angularFireAuth.authState.subscribe(user => {
              if (user!.emailVerified == false) {
                window.alert('Zweryfikuj swój adres email!');
              }
              else if (user) {
                this.router.navigate(['home']);
              } else {
                window.alert('Niepoprawny email lub hasło!');
              }
            });
          }).catch(error => {
            window.alert(error.message);
          });
      });
    });
  }

  public signUp(email: string, password: string, displayName: string): void {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        result.user?.updateProfile({ displayName: displayName });
        this.setUserData(result.user);
        this.sendVerificationEmail();
      }).catch(error => {
        window.alert(error.message);
      });
  }

  private setUserData(user: any): Promise<void> {
    const userRef = this.angularFireDatabase.object(`Users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      banned: false,
      roles: {
        guest: true,
        customer: true,
      },
      displayName: user.displayName,
      emailVerified: user.emailVerified,
    };
    return userRef.update(userData);
  }

  public sendVerificationEmail(): void {
    this.angularFireAuth.currentUser
      .then(u => u?.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  public forgotPassword(passwordResetEmail: string): void {
    this.angularFireAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch(error => {
        window.alert(error);
      });
  }

  public get isLoggedIn(): boolean {
    return !!this.userSubject.value && this.userSubject.value.emailVerified;
  }

  public authLogin(provider: auth.AuthProvider): Promise<void> {
    return this.angularFireAuth.signInWithPopup(provider)
      .then(_ => {
        this.router.navigate(['dashboard']);
      }).catch(error => {
        window.alert(error);
      });
  }

  public googleAuth(): Promise<void> {
    return this.authLogin(new auth.GoogleAuthProvider()).then(() => {
      this.router.navigate(['dashboard']);
    });
  }

  public singOut(): void {
    this.angularFireAuth.signOut().then(() => {
      window.alert('Wylogowano!');
      this.reservedTripsForUserService.clearReservedTripsForUser();
      this.router.navigate(['home']);
      // location.reload();
    });
  }

  public canRead(user: User): boolean {
    const allowed = ['admin', 'manager', 'customer'];
    return this.checkAuthorization(user, allowed);
  }

  public canEdit(user: User): boolean {
    const allowed = ['admin', 'manager'];
    return this.checkAuthorization(user, allowed);
  }

  public canDelete(user: User): boolean {
    const allowed = ['admin', 'manager'];
    return this.checkAuthorization(user, allowed);
  }

  public canRate(user: User): boolean {
    const allowed = ['admin', 'customer'];
    return this.checkAuthorization(user, allowed);
  }

  public canCommentAll(user: User): boolean {
    const allowed = ['admin', 'manager'];
    return this.checkAuthorization(user, allowed);
  }

  public adminAccess(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }


  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if ((user.roles as any)[role]) {
        return true;
      }
    }
    return false;
  }
}
