import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-trip-rating',
  templateUrl: './trip-rating.component.html',
  styleUrls: ['./trip-rating.component.css']
})
export class TripRatingComponent implements OnInit {

  constructor() { }
  @Output() ratingCahnged: EventEmitter<number> = new EventEmitter<number>();

  @Input() likes: number = 0;
  @Input() disLikes: number = 0;

  public faThumbUp: any = faThumbsUp;
  public faThumbDown: any = faThumbsDown;

  rating!: number;
  alreadyVoted: boolean = false;


  ngOnInit(): void {
    if (this.disLikes + this.likes !== 0) {

      this.rating = (this.likes) / (this.disLikes + this.likes) * 100;
    } else {
      this.rating = 0;
    }
  }

  rattingApplied(option: string) {
    if (this.alreadyVoted) return;
    if (option === "+") {
      this.ratingCahnged.emit(1)
    }
    else {
      this.ratingCahnged.emit(-1)
    }
    this.rating = (this.likes) / (this.disLikes + this.likes) * 100;

    this.alreadyVoted = true;
  }

}
