import { TestBed } from '@angular/core/testing';

import { SalesRecieptService } from './sales-reciept.service';

describe('SalesRecieptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesRecieptService = TestBed.get(SalesRecieptService);
    expect(service).toBeTruthy();
  });
});
