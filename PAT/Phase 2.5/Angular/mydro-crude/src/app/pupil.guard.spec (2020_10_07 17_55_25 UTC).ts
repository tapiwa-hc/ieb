import { TestBed } from '@angular/core/testing';

import { PupilGuard } from './pupil.guard';

describe('PupilGuard', () => {
  let guard: PupilGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PupilGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
