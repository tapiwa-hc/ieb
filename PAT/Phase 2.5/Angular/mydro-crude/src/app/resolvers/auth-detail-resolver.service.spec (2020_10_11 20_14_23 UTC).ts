import { TestBed } from '@angular/core/testing';

import { AuthDetailResolverService } from './auth-detail-resolver.service';

describe('AuthDetailResolverService', () => {
  let service: AuthDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
