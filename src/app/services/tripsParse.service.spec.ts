/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TripsParseService } from './tripsParse.service';

describe('Service: TripsParse', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TripsParseService]
    });
  });

  it('should ...', inject([TripsParseService], (service: TripsParseService) => {
    expect(service).toBeTruthy();
  }));
});
