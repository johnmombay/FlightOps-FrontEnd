import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftFlightComponent } from './aircraft-flight.component';

describe('AircraftFlightComponent', () => {
  let component: AircraftFlightComponent;
  let fixture: ComponentFixture<AircraftFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AircraftFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
