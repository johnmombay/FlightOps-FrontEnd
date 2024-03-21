import { TestBed } from '@angular/core/testing';

import { CrewPositionService } from './crew-position.service';

describe('CrewPositionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrewPositionService = TestBed.get(CrewPositionService);
    expect(service).toBeTruthy();
  });
});
