import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { MaterialModule } from 'src/app/material.module';
import { SystemModule } from 'src/app/system/system.module';
import { SystemComponent } from 'src/app/system/system.component';
import { AircraftModule } from 'src/app/aircraft/aircraft.module';
import { AircraftComponent } from 'src/app/aircraft/aircraft.component';
import { CommercialPlanningModule } from 'src/app/commercial-planning/commercial-planning.module';
import { CommercialPlanningComponent } from 'src/app/commercial-planning/commercial-planning.component';
import { CrewPlanningModule } from 'src/app/crew-planning/crew-planning.module';
import { CrewPlanningComponent } from 'src/app/crew-planning/crew-planning.component';
import { FlightOperationModule } from 'src/app/flight-operation/flight-operation.module';
import { FlightOperationComponent } from 'src/app/flight-operation/flight-operation.component';
import { ReportsModule } from 'src/app/reports/reports.module';
import { ReportsComponent } from 'src/app/reports/reports.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SystemModule,
    AircraftModule,
    CommercialPlanningModule,
    CrewPlanningModule,
    FlightOperationModule,
    ReportsModule,
  ],
  declarations: [
    DashboardComponent,
    SystemComponent,
    AircraftComponent,
    CommercialPlanningComponent,
    CrewPlanningComponent,
    FlightOperationComponent,
    ReportsComponent,
  ]
})

export class AdminLayoutModule { }
