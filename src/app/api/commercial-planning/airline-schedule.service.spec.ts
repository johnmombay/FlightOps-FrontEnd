import { TestBed } from '@angular/core/testing';

import { AirlineScheduleService } from './airline-schedule.service';

describe('AirlineScheduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AirlineScheduleService = TestBed.get(AirlineScheduleService);
    expect(service).toBeTruthy();
  });
});
