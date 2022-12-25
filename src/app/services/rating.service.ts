import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private opinion: Subject<Number> = new Subject<Number>();

  constructor() { }


  public eventEmitChangeOpinion(value: number) {
    this.opinion.next(value);
  }

  public changeOpinionEventListener(): Observable<Number> {
    return this.opinion.asObservable();
  }
}
