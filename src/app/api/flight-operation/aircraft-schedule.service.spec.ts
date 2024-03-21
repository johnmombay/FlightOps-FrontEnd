import { TestBed } from '@angular/core/testing';

import { AircraftScheduleService } from './aircraft-schedule.service';

describe('AircraftScheduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AircraftScheduleService = TestBed.get(AircraftScheduleService);
    expect(service).toBeTruthy();
  });
});
