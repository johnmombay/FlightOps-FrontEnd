import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AircraftFlightComponent } from './aircraft-flight/aircraft-flight.component';
import { MaterialModule } from '../material.module';
import { TodaysFlightComponent } from './todays-flight/todays-flight.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AircraftFlightComponent,
    TodaysFlightComponent
  ],
  exports: [
    AircraftFlightComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FullCalendarModule,
    NgxMaterialTimepickerModule,
    NgxSpinnerModule,
  ]
})
export class FlightOperationModule { }
