import { TestBed } from '@angular/core/testing';

import { OfficeCostService } from './office-cost.service';

describe('OfficeCostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfficeCostService = TestBed.get(OfficeCostService);
    expect(service).toBeTruthy();
  });
});
