import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  public gotoSignIn(): void {
    this.router.navigate(['../sign-in'], { relativeTo: this.activeRoute });
  }

}
