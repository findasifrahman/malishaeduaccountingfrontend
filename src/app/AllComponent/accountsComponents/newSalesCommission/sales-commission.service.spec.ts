import { TestBed } from '@angular/core/testing';

import { SalesCommissionService } from './sales-commission.service';

describe('SalesCommissionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesCommissionService = TestBed.get(SalesCommissionService);
    expect(service).toBeTruthy();
  });
});
