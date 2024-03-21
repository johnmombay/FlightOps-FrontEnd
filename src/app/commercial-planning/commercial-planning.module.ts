import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { RouteComponent } from './route/route.component';
import { FlightScheduleComponent } from './flight-schedule/flight-schedule.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  resourceTimelinePlugin
]);

@NgModule({
  declarations: [
    RouteComponent,
    FlightScheduleComponent
  ],
  exports: [
    RouteComponent,
    FlightScheduleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FullCalendarModule,
    NgxMaterialTimepickerModule,
  ]
})
export class CommercialPlanningModule { }
