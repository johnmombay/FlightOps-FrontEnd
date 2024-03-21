import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { SystemComponent } from 'src/app/system/system.component';
import { UsersComponent } from 'src/app/system/users/users.component';
import { AirportsComponent } from 'src/app/system/airports/airports.component';
import { SettingsComponent } from 'src/app/system/settings/settings.component';
import { CountriesComponent } from 'src/app/system/countries/countries.component';
import { CitiesComponent } from 'src/app/system/cities/cities.component';
import { CategoryComponent } from 'src/app/system/category/category.component';
import { AircraftComponent } from 'src/app/aircraft/aircraft.component';
import { AircraftTypeComponent } from 'src/app/aircraft/aircraft-type/aircraft-type.component';
import { AircraftsComponent } from 'src/app/aircraft/aircrafts/aircrafts.component';
import { MaintenanceComponent } from 'src/app/aircraft/maintenance/maintenance.component';
import { MaintenanceScheduleComponent } from 'src/app/aircraft/maintenance-schedule/maintenance-schedule.component';
import { CommercialPlanningComponent } from 'src/app/commercial-planning/commercial-planning.component';
import { CrewPlanningComponent } from 'src/app/crew-planning/crew-planning.component';
import { FlightOperationComponent } from 'src/app/flight-operation/flight-operation.component';
import { ReportsComponent } from 'src/app/reports/reports.component';
import { RouteComponent } from 'src/app/commercial-planning/route/route.component';
import { FlightScheduleComponent } from 'src/app/commercial-planning/flight-schedule/flight-schedule.component';
import { CrewComponent } from 'src/app/crew-planning/crew/crew.component';
import { CrewAircraftComponent } from 'src/app/crew-planning/crew-aircraft/crew-aircraft.component';
import { CrewScheduleComponent } from 'src/app/crew-planning/crew-schedule/crew-schedule.component';
import { AircraftFlightComponent } from 'src/app/flight-operation/aircraft-flight/aircraft-flight.component';
import { TodaysFlightComponent } from 'src/app/flight-operation/todays-flight/todays-flight.component';


export const AdminLayoutRoutes: Routes = [

    { 
        path: 'dashboard', component: DashboardComponent,
        children: [

        ]
    },
    {
        path: 'system', component: SystemComponent,
        children: [
            { path: '', redirectTo: 'users', pathMatch: 'full' },
            { path: 'users', component: UsersComponent },
            { path: 'airports', component: AirportsComponent },
            { path: 'category', component: CategoryComponent },
            { path: 'cities', component: CitiesComponent },
            { path: 'countries', component: CountriesComponent },
            { path: 'settings', component: SettingsComponent },
        ]
    },
    {
        path: 'aircraft', component: AircraftComponent,
        children: [
            { path: '', redirectTo: 'aircraft-type', pathMatch: 'full' },
            { path: 'aircraft-type', component: AircraftTypeComponent },
            { path: 'aircrafts', component: AircraftsComponent },
            { path: 'maintenance', component: MaintenanceComponent },
            { path: 'maintenance-schedule', component: MaintenanceScheduleComponent },
        ]
    },
    {
        path: 'commercial-planning', component: CommercialPlanningComponent,
        children: [
            { path: '', redirectTo: 'flight-schedule', pathMatch: 'full' },
            { path: 'route', component: RouteComponent },
            { path: 'flight-schedule', component: FlightScheduleComponent },
        ]
    },
    {
        path: 'crew-planning', component: CrewPlanningComponent,
        children: [
            { path: '', redirectTo: 'crew', pathMatch: 'full' },
            { path: 'crew', component: CrewComponent },
            { path: 'crew-aircraft', component: CrewAircraftComponent },
            { path: 'crew-schedule', component: CrewScheduleComponent },
        ]
    },
    {
        path: 'flight-operation', component: FlightOperationComponent,
        children: [
            { path: '', redirectTo: 'aircraft-flight', pathMatch: 'full' },
            { path: 'aircraft-flight', component: AircraftFlightComponent },
            { path: 'todays-flight', component: TodaysFlightComponent },

        ]
    },
    {
        path: 'reports', component: ReportsComponent,
        children: [

        ]
    },

];
