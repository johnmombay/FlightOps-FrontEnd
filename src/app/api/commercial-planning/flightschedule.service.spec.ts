import { TestBed } from '@angular/core/testing';

import { FlightscheduleService } from './flightschedule.service';

describe('FlightscheduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlightscheduleService = TestBed.get(FlightscheduleService);
    expect(service).toBeTruthy();
  });
});
