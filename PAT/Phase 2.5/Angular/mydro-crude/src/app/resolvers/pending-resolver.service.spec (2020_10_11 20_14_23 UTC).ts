import { TestBed } from '@angular/core/testing';

import { PendingResolverService } from './pending-resolver.service';

describe('PendingResolverService', () => {
  let service: PendingResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendingResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
