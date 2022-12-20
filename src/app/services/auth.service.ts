import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { Observable } from 'rxjs';
import { User } from '../Models/User';
import { SettingsChangeService } from './settingsChange.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData: any;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    private router: Router,
    private settings: SettingsChangeService
  ) {

    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;

        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  public get user(): Observable<any> {
    if (this.userData != null) {
      return this.angularFireDatabase.object(`Users/${this.userData.uid}`).valueChanges();
    }
    return new Observable();
  }

  public updateUserData(user: User): void {
    this.angularFireDatabase.object(`Users/${user.uid}`).update(user);
  }

  public signIn(email: string, password: string): void {
    this.settings.getPersistance().subscribe((persistance: any) => {
      this.angularFireAuth.setPersistence(persistance.value).then(() => {
        this.angularFireAuth.signInWithEmailAndPassword(email, password)
          .then(result => {
            this.setUserData(result.user);
            this.angularFireAuth.authState.subscribe(user => {
              if (user!.emailVerified == false) {
                window.alert('Zweryfikuj swój adres email!');
              }
              else if (user) {
                this.router.navigate(['dashboard']);
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
      roles: {
        guest: true,
        customer: true,
        manager: false,
        admin: false
      },
      displayName: user.displayName,
      emailVerified: user.emailVerified,
      banned: false
    };
    return userRef.set(userData);
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
    const user = JSON.parse(localStorage.getItem('user')!);
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  public authLogin(provider: auth.AuthProvider): Promise<void> {
    return this.angularFireAuth.signInWithPopup(provider)
      .then(result => {
        this.router.navigate(['dashboard']);
        this.setUserData(result.user);
      }).catch(error => {
        window.alert(error);
      });
  }

  public googleAuth(): Promise<void> {
    return this.authLogin(new auth.GoogleAuthProvider()).then(() => {
      this.router.navigate(['dashboard']);
      this.setUserData(this.userData);
    });
  }

  public singOut(): void {
    this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
      window.alert('Wylogowano!');
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
    const allowed = ['admin'];
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
