import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private opinion: BehaviorSubject<Number> = new BehaviorSubject<Number>(0);

  constructor() { }


  public eventEmitChangeOpinion(value: number) {
    this.opinion.next(value);
  }

  public changeOpinionEventListener(): Observable<Number> {
    return this.opinion.asObservable();
  }

}
