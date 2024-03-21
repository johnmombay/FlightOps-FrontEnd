import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { AirportsComponent } from './airports/airports.component';
import { CategoryComponent } from './category/category.component';
import { CitiesComponent } from './cities/cities.component';
import { CountriesComponent } from './countries/countries.component';
import { SettingsComponent } from './settings/settings.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';



@NgModule({
  declarations: [
    UsersComponent, 
    AirportsComponent, 
    CategoryComponent, 
    CitiesComponent, 
    CountriesComponent, 
    SettingsComponent,
  ],
  exports: [
    UsersComponent, 
    AirportsComponent, 
    CategoryComponent, 
    CitiesComponent, 
    CountriesComponent, 
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxMaterialTimepickerModule,
  ]
})
export class SystemModule { }
