import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  public gotoSignIn(): void {
    this.router.navigate(['../sign-in'], { relativeTo: this.activeRoute });
  }
}
