import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewPlanningComponent } from './crew-planning.component';

describe('CrewPlanningComponent', () => {
  let component: CrewPlanningComponent;
  let fixture: ComponentFixture<CrewPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrewPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrewPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
