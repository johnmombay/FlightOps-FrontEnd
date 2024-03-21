import { TestBed } from '@angular/core/testing';

import { ScheduleAircraftService } from './schedule-aircraft.service';

describe('ScheduleAircraftService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScheduleAircraftService = TestBed.get(ScheduleAircraftService);
    expect(service).toBeTruthy();
  });
});
