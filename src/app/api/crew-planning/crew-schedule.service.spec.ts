import { TestBed } from '@angular/core/testing';

import { CrewScheduleService } from './crew-schedule.service';

describe('CrewScheduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrewScheduleService = TestBed.get(CrewScheduleService);
    expect(service).toBeTruthy();
  });
});
