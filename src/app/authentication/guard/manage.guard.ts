import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManageGuard implements CanActivate {
  public constructor(private auth: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.userObservable().pipe(
      filter((res: any) => res),
      take(1),
      map(user => user && (user.roles.admin || user.roles.manager) ? true : false),
      tap(isAdmin => {
        if (!isAdmin) {
          window.alert('Access denied - Admins only');
        }
      }));;
  }

}
