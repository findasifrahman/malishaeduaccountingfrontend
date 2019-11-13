import { TestBed } from '@angular/core/testing';

import { IncoomeSourceService } from './incoome-source.service';

describe('IncoomeSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IncoomeSourceService = TestBed.get(IncoomeSourceService);
    expect(service).toBeTruthy();
  });
});
