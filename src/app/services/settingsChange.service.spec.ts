/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SettingsChangeService } from './settingsChange.service';

describe('Service: SettingsChange', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingsChangeService]
    });
  });

  it('should ...', inject([SettingsChangeService], (service: SettingsChangeService) => {
    expect(service).toBeTruthy();
  }));
});
