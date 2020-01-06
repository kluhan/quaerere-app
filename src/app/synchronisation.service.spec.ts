import { TestBed } from '@angular/core/testing';

import { SynchronisationService } from './synchronisation.service';

describe('SynchronisationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SynchronisationService = TestBed.get(SynchronisationService);
    expect(service).toBeTruthy();
  });
});
