/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
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
