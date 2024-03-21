import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftTypeComponent } from './aircraft-type.component';

describe('AircraftTypeComponent', () => {
  let component: AircraftTypeComponent;
  let fixture: ComponentFixture<AircraftTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AircraftTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
