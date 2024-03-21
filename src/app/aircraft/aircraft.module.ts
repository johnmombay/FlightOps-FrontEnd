import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { AircraftTypeComponent } from './aircraft-type/aircraft-type.component';
import { AircraftsComponent } from './aircrafts/aircrafts.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { MaintenanceScheduleComponent } from './maintenance-schedule/maintenance-schedule.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  resourceTimelinePlugin
]);

@NgModule({
  declarations: [
    AircraftTypeComponent, 
    AircraftsComponent, 
    MaintenanceComponent, 
    MaintenanceScheduleComponent
  ],
  exports: [
    AircraftTypeComponent, 
    AircraftsComponent, 
    MaintenanceComponent, 
    MaintenanceScheduleComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    NgxMaterialTimepickerModule,
  ]
})
export class AircraftModule { }
