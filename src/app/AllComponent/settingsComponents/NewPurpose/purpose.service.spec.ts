import { TestBed } from '@angular/core/testing';

import { PurposeService } from './purpose.service';

describe('PurposeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PurposeService = TestBed.get(PurposeService);
    expect(service).toBeTruthy();
  });
});
