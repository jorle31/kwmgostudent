import { TestBed } from '@angular/core/testing';

import { CanNavigateToUserSpacesGuard } from './can-navigate-to-user-spaces.guard';

describe('CanNavigateToUserSpacesGuard', () => {
  let guard: CanNavigateToUserSpacesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanNavigateToUserSpacesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
