import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminUsersService } from 'src/app/services/adminUsers.service';

@Component({
  selector: 'app-editForm',
  templateUrl: './editForm.component.html',
  styleUrls: ['./editForm.component.css']
})
export class EditFormComponent implements OnInit {

  public emailPassed: string = '';
  public namePassed: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<EditFormComponent>,
    private adminUsersService: AdminUsersService,
  ) { }

  ngOnInit() {
    this.setToDefault();
  }


  public setToDefault(): void {
    this.emailPassed = this.data.user.email;
    this.namePassed = this.data.user.displayName;
  }

  public handleSubmit(): void {
    this.adminUsersService.updateUserByValue(this.data.user.uid, {
      email: this.emailPassed,
      displayName: this.namePassed,
    });
    this.closeDialog();
  }

  public closeDialog(): void {
    this.matDialogRef.close();
  }



  ngOnDestroy() {
    this.closeDialog();
  }

}
