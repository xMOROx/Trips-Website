/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { ReservedTripsForUserService } from './reservedTripsForUser.service';

describe('Service: ReservedTripsForUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReservedTripsForUserService]
    });
  });

  it('should ...', inject([ReservedTripsForUserService], (service: ReservedTripsForUserService) => {
    expect(service).toBeTruthy();
  }));
});
