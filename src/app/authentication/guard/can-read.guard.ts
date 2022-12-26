import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap, filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class CanReadGuard implements CanActivate {

  public constructor(private auth: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.userObservable().pipe(
      filter((res: any) => res),
      take(1),
      map(user => user && this.auth.canRead(user) ? true : false),
      tap(canRead => {
        if (!canRead) {
          window.alert('Access denied - Read only');
        }
      }));
  }
}
