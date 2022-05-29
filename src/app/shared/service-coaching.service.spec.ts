import { TestBed } from '@angular/core/testing';

import { ServiceCoachingService } from './service-coaching.service';

describe('ServiceCoachingService', () => {
  let service: ServiceCoachingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCoachingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
