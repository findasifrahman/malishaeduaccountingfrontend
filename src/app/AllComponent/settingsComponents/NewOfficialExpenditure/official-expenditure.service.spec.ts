import { TestBed } from '@angular/core/testing';

import { OfficialExpenditureService } from './official-expenditure.service';

describe('OfficialExpenditureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfficialExpenditureService = TestBed.get(OfficialExpenditureService);
    expect(service).toBeTruthy();
  });
});
