/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { BoughtTripsService } from './boughtTrips.service';

describe('Service: BoughtTrips', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoughtTripsService]
    });
  });

  it('should ...', inject([BoughtTripsService], (service: BoughtTripsService) => {
    expect(service).toBeTruthy();
  }));
});
