import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightOperationComponent } from './flight-operation.component';

describe('FlightOperationComponent', () => {
  let component: FlightOperationComponent;
  let fixture: ComponentFixture<FlightOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
