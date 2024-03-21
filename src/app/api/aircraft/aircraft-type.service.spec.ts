import { TestBed } from '@angular/core/testing';

import { AircraftTypeService } from './aircraft-type.service';

describe('AircraftTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AircraftTypeService = TestBed.get(AircraftTypeService);
    expect(service).toBeTruthy();
  });
});
