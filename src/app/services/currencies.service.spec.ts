/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CurrenciesService } from './currencies.service';

describe('Service: Currencies', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrenciesService]
    });
  });

  it('should ...', inject([CurrenciesService], (service: CurrenciesService) => {
    expect(service).toBeTruthy();
  }));
});
