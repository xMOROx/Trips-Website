
import { inject, TestBed } from '@angular/core/testing';
import { NotificationsService } from './notifications.service';

describe('Service: Notifications', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationsService]
    });
  });

  it('should ...', inject([NotificationsService], (service: NotificationsService) => {
    expect(service).toBeTruthy();
  }));
});
