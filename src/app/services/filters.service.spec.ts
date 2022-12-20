/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { FiltersService } from './filters.service';

describe('Service: Filters', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiltersService]
    });
  });

  it('should ...', inject([FiltersService], (service: FiltersService) => {
    expect(service).toBeTruthy();
  }));
});
