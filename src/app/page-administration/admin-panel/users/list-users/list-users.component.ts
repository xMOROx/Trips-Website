import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import { AdminUsersService } from 'src/app/services/adminUsers.service';
import { AuthService } from 'src/app/services/auth.service';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { EditFormComponent } from '../editForm/editForm.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  public users: User[] = [];
  public user!: User;
  constructor(
    private adminUsersService: AdminUsersService,
    private auth: AuthService,
    private MatDialog: MatDialog,
    private sso: ScrollStrategyOptions,
  ) { }

  ngOnInit() {
    this.adminUsersService.getUsers().valueChanges().subscribe((users: User[]) => {
      this.users = users;
    });
    this.auth.user.subscribe((user: User) => {
      if (user) {
        this.user = user;
      }
    });
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

  public modifyUser(): void {
    if (this.auth.canEdit(this.user)) {
      this.MatDialog.open(EditFormComponent, {
        width: '80vw',
        scrollStrategy: this.sso.noop(),
        autoFocus: false,
        data: {
          user: this.user
        }
      });
    }
  }
}
