import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysFlightComponent } from './todays-flight.component';

describe('TodaysFlightComponent', () => {
  let component: TodaysFlightComponent;
  let fixture: ComponentFixture<TodaysFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaysFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
