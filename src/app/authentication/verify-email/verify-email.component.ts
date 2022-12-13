import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  public gotoSignIn(): void {
    this.router.navigate(['../sign-in'], { relativeTo: this.activeRoute });
  }


}
