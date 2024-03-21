import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { CrewComponent } from './crew/crew.component';
import { CrewAircraftComponent } from './crew-aircraft/crew-aircraft.component';
import { CrewScheduleComponent } from './crew-schedule/crew-schedule.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
@NgModule({
  declarations: [
    CrewComponent, 
    CrewAircraftComponent, 
    CrewScheduleComponent
  ],
  exports: [
    CrewComponent, 
    CrewAircraftComponent, 
    CrewScheduleComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ]
})
export class CrewPlanningModule { }
