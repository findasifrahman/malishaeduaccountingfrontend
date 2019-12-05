import { TestBed } from '@angular/core/testing';

import { ClientGroupService } from './client-group.service';

describe('ClientGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientGroupService = TestBed.get(ClientGroupService);
    expect(service).toBeTruthy();
  });
});
