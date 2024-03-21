import { Component, OnInit } from '@angular/core';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { CalendarOptions, DateSelectArg, Calendar } from '@fullcalendar/angular';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { ApiService } from 'src/app/api.service';
import { MatTableDataSource } from '@angular/material';
import { AircraftListMaintenance } from  'src/app//Aircraftdata';
import { MaintainanceSched } from  'src/app//Aircraftdata';
import { MaintainanceList } from  'src/app//Aircraftdata';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as moment from 'moment';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';


export class AircraftListMaintenanceElement {
  id: number;
  aircraftType:  string;
  aregistration:  string;
}


export  class  MaintainanceSchedElement {
  id: number;
  resourceIdMaintenance: number;
  maintenanceId: number;
  aircraftId: number;
  scheduleFrom: string;
  scheduleTo : string;
}

@Component({
  selector: 'app-maintenance-schedule',
  templateUrl: './maintenance-schedule.component.html',
  styleUrls: ['./maintenance-schedule.component.scss']
})


export class MaintenanceScheduleComponent implements OnInit {
  darkTheme: NgxMaterialTimepickerTheme = { // ngx-timepicker style
    container: {
      bodyBackgroundColor: '#424242',
      buttonColor: '#fff'
    },
    dial: {
      dialBackgroundColor: '#555',
    },
    clockFace: {
      clockFaceBackgroundColor: '#555',
      clockHandColor: '#9fbd90',
      clockFaceTimeInactiveColor: '#fff'
    }
  };
  
  calendarListOfAirplane: any = {};
  calendarListOfSchedule: any = {};
  listofMaintenance: any = {};
  show_calendarlist: boolean = true;
  selectedAircraft: any;
  public selectedResource: any = {};


  aircraft_dataSource: MatTableDataSource<AircraftListMaintenanceElement>; // mat-table sched_dataSource
  schedule_dataSource: MatTableDataSource<MaintainanceSchedElement>; // mat-table aircraft_dataSource


  calendarOptions: CalendarOptions = {
    plugins: [resourceTimelinePlugin, interactionPlugin],
    timeZone: 'UTC',
    headerToolbar: {
      left: 'today prev,next',
      center: 'title',
      right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
    },

    slotLabelFormat: { hour: 'numeric', minute: '2-digit', hour12: false },
    initialView: 'resourceTimeline',
    scrollTime: '00:00',
    height: 'auto',
    aspectRatio: 1.5,
    views: {},
    editable: false,
    resourceAreaColumns: [
      {
        field: 'saircarft',
        headerContent: 'Aircraft'
      }
      // ,
      // {
      //   field: 'aregistration',
      //   headerContent: 'Start - End'
      // }
    ],
    refetchResourcesOnNavigate: true,
    resources: [],
    selectable: true,
    select: (info) => {
      this.selectedAircraft = info.resource._resource.extendedProps.aircraftType + "(" +   info.resource._resource.extendedProps.aregistration + ")";
      this.show_calendarlist = false;
      this.selectedResource = info
      console.log(info)
    },

    events: []
  };


  constructor(private apiService: ApiService) {

  }

  readAircraftData(){
    this.apiService.readAircraftList().subscribe((aircraftList: AircraftListMaintenance[])=>{
      const rows = [];
      aircraftList.forEach(element => rows.push(element));
      this.aircraft_dataSource = new MatTableDataSource(rows);
      this.calendarListOfAirplane = aircraftList;
      this.calendarOptions.resources = this.calendarListOfAirplane
    })
  }

  readMaintenanceData(){
    this.apiService.readMainList().subscribe((maintenanceSched: MaintainanceSched[])=>{
      console.log(maintenanceSched)
      const rows = [];
      maintenanceSched.forEach(element => rows.push(element));
      this.schedule_dataSource = new MatTableDataSource(rows);
      this.calendarListOfSchedule = maintenanceSched;
      // this.calendarOptions.resources = this.calendarListOfAirplane
      console.log(rows);
    })
  }

  saveEvents(form){
 
    console.log(form.value)


  }

  pushEvent(newEvent) {
    let calendarEvents
    calendarEvents = this.calendarOptions.events
    calendarEvents.push(newEvent)
    console.log(calendarEvents)

  }



  ngOnInit() {
    this.readAircraftData();
    this.readMaintenanceData();
 
    this.apiService.readMaintenanceList().subscribe((listMaintenances: MaintainanceList[])=>{
      this.listofMaintenance = listMaintenances;
    })
    
  }

 
 
}
