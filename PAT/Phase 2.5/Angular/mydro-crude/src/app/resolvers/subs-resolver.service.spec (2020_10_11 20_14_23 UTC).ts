import { TestBed } from '@angular/core/testing';

import { SubsResolverService } from './subs-resolver.service';

describe('SubsResolverService', () => {
  let service: SubsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
