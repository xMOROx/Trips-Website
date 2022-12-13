import { Injectable, NgZone } from '@angular/core';
import { User } from '../Models/User';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    private router: Router,
    private ngZone: NgZone
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

  public signIn(email: string, password: string): void {
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(result => {
        this.setUserData(result.user);
        this.angularFireAuth.authState.subscribe(user => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
      }).catch(error => {
        window.alert(error.message);
      });
  }

  public signUp(email: string, password: string): void {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then(result => {
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
      displayName: user.displayName,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData);
  }

  public sendVerificationEmail(): void {
    this.angularFireAuth.currentUser.then(u => u?.sendEmailVerification())
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
    return user !== null && user.emailVerified !== false;
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
      this.router.navigate(['sign-in']);
    });
  }

}
