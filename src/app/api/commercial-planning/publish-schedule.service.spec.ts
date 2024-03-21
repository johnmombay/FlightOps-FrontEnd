import { TestBed } from '@angular/core/testing';

import { PublishScheduleService } from './publish-schedule.service';

describe('PublishScheduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublishScheduleService = TestBed.get(PublishScheduleService);
    expect(service).toBeTruthy();
  });
});
