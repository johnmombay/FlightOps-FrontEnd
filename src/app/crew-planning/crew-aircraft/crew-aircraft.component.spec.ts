import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewAircraftComponent } from './crew-aircraft.component';

describe('CrewAircraftComponent', () => {
  let component: CrewAircraftComponent;
  let fixture: ComponentFixture<CrewAircraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrewAircraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrewAircraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
