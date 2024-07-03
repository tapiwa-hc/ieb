import { TestBed } from '@angular/core/testing';

import { MobileAuthService } from './mobile-auth.service';

describe('MobileAuthService', () => {
  let service: MobileAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
