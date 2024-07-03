import { TestBed } from '@angular/core/testing';

import { AllTableResolverService } from './all-table-resolver.service';

describe('AllTableResolverService', () => {
  let service: AllTableResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllTableResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
