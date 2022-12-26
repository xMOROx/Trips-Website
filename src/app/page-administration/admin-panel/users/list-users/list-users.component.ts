import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faEllipsisV, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs/operators';
import { User } from 'src/app/Models/User';
import { AdminUsersService } from 'src/app/services/adminUsers.service';
import { AuthService } from 'src/app/services/auth.service';
import { EditFormComponent } from '../editForm/editForm.component';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  public screenWidth!: number;
  public screenHeight!: number;
  public smallTable: boolean = false;

  public faEllipsisV: IconDefinition = faEllipsisV;

  public user!: any;
  public users: any[] = [];

  constructor
    (
      private auth: AuthService,
      private MatDialog: MatDialog,
      private sso: ScrollStrategyOptions,
      private adminUsersService: AdminUsersService,
    ) {
    this.getScreenSize();
  }

  ngOnInit() {
    this.adminUsersService.users.subscribe((users: any[]) => {
      this.users = users;
      this.users.forEach((user: any) => {
        user.isMenuOpen = false;
      });
    });

    this.auth.userObservable()
      .pipe(filter((res: any) => res))
      .subscribe((user: any) => {
        if (user) {
          this.user = user;
        }
      });
  }


  @HostListener('window:resize', ['$event'])
  getScreenSize(_?: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 1164) {
      this.smallTable = false;
    } else {
      this.smallTable = true;
    }
  }


  public deleteUser(user: User): void {
    this.adminUsersService.deleteUser(user.uid);
  }

  public changeRole(user: User, value: object): void {
    this.adminUsersService.updateUserRolesByValue(user.uid, value);
  }

  public changeBanned(user: User, value: boolean): void {
    this.adminUsersService.updateUserByValue(user.uid, { banned: value });
  }

  public modifyUser(user: any): void {
    if (this.auth.canEdit(this.user)) {
      this.MatDialog.open(EditFormComponent, {
        width: '80vw',
        scrollStrategy: this.sso.noop(),
        autoFocus: false,
        data: {
          user: user
        }
      });
    }
  }

  public toggleMenu(user: any): void {
    user.isMenuOpen = !user.isMenuOpen;
  }

  public clickedOutside(user: any): void {
    user.isMenuOpen = false;
  }
}
