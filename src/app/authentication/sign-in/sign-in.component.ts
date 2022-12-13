import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  public goToForgotPassword(): void {
    this.router.navigate(['../forgot-password'], { relativeTo: this.activeRoute });
  }
  public goToRegister(): void {
    this.router.navigate(['../register-user'], { relativeTo: this.activeRoute });
  }
}
