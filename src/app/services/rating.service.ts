import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private opinion: ReplaySubject<Number> = new ReplaySubject<Number>();

  constructor() { }


  public eventEmitChangeOpinion(value: number) {
    this.opinion.next(value);
  }

  public changeOpinionEventListener(): Observable<Number> {
    return this.opinion.asObservable();
  }

}
