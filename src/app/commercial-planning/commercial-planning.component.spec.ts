import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialPlanningComponent } from './commercial-planning.component';

describe('CommercialPlanningComponent', () => {
  let component: CommercialPlanningComponent;
  let fixture: ComponentFixture<CommercialPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommercialPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercialPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
