import { Component, Input, OnInit } from '@angular/core';
import { faThumbsDown, faThumbsUp, IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { filter } from 'rxjs/operators';
import { User } from 'src/app/Models/User';
import { AuthService } from 'src/app/services/auth.service';
import { RatingService } from 'src/app/services/rating.service';
@Component({
  selector: 'app-trip-rating',
  templateUrl: './trip-rating.component.html',
  styleUrls: ['./trip-rating.component.css']
})
export class TripRatingComponent implements OnInit {

  constructor
    (
      public auth: AuthService,
      private opinionChangeService: RatingService,
    ) { }

  @Input() public tripKey!: string;
  @Input() public likes: number = 0;
  @Input() public disLikes: number = 0;

  public faThumbUp: IconDefinition = faThumbsUp;
  public faThumbDown: IconDefinition = faThumbsDown;

  public user!: User;

  public rating!: number;
  public alreadyVoted: boolean = false;


  ngOnInit(): void {
    if (this.disLikes + this.likes !== 0) {
      this.rating = (this.likes) / (this.disLikes + this.likes) * 100;
    } else {
      this.rating = 0;
    }

    this.auth.userObservable().pipe(filter((res: any) => res)).subscribe((user: User) => {
      if (user) {
        this.user = user;
      }
    });
  }

  rattingApplied(option: string) {
    if (this.user!.keysOfLikedTrips !== undefined) {
      for (const likedTripKey of this.user!.keysOfLikedTrips!) {
        if (likedTripKey === this.tripKey) {
          return;
        }
      }
    } else {
      this.user!.keysOfLikedTrips = [];
    }

    if (option === "+") {
      this.opinionChangeService.eventEmitChangeOpinion(1);
    }
    else {
      this.opinionChangeService.eventEmitChangeOpinion(-1);
    }

    this.user!.keysOfLikedTrips!.push(this.tripKey);
    this.auth.updateUserData(this.user!);
    this.rating = (this.likes) / (this.disLikes + this.likes) * 100;
  }
}
