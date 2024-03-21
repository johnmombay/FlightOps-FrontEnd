import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { CalendarOptions, DateSelectArg, Calendar } from '@fullcalendar/angular';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { MatSnackBar, MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { AircraftScheduleService } from 'src/app/api/flight-operation/aircraft-schedule.service';
import { AircraftService } from 'src/app/api/aircraft/aircraft.service';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

@Component({
  selector: 'app-aircraft-flight',
  templateUrl: './aircraft-flight.component.html',
  styleUrls: ['./aircraft-flight.component.scss']
})
export class AircraftFlightComponent implements OnInit {
  @ViewChild('assignTmp', { static: false }) assignTmp
  @ViewChild('astdTmp', { static: false }) astdTmp
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
  assignInfo: any = {};
  aircrafts: any;
  minDate = new Date();
  maxDate = new Date();
  calendarApi: any;
  calendarApi2: any;
  events: any = [];
  events2: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  flight_CalendarOptions: CalendarOptions = {
    schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
    plugins: [resourceTimelinePlugin, interactionPlugin],
    timeZone: 'UTC',
    headerToolbar: {
      // left: 'today prev,next myCustomButton',
      left: 'today prev,next',
      center: 'title',
      // right: 'resourceTimelineDay,resourceTimelineTenDay,resourceTimelineMonth,resourceTimelineYear'
      right: 'resourceTimelineDay,resourceTimelineMonth'
    },

    slotLabelFormat: { hour: 'numeric', minute: '2-digit', hour12: false },
    initialView: 'resourceTimelineDay',
    scrollTime: '00:00',
    height: 'auto',
    aspectRatio: 1.5,
    views: {},
    editable: false,
    resourceAreaColumns: [
      {
        field: 'name',
        headerContent: 'Aircraft Type'
      },
      {
        field: 'description',
        headerContent: 'Start - End'
      }
    ],
    // refetchResourcesOnNavigate: true,
    resources: [],
    resourceLabelDidMount: info => {
      var assignBtn = document.createElement('button');
      assignBtn.innerHTML = '<span class="mat-button-wrapper"><mat-icon _ngcontent-eds-c10="" class="mat-icon notranslate ng-tns-c10-0 material-icons mat-icon-no-color" role="img" aria-hidden="true">more</mat-icon></span>';
      assignBtn.style.margin = '0px 0px'
      assignBtn.className = 'ng-tns-c10-0 pull-right mat-icon-button mat-button-base mat-primary'
      assignBtn.addEventListener('click', evt => {
        // console.log(evt)
        console.log(info);
        this.setAssignment(info.resource._resource)
      })

      info.el.querySelector('.fc-datagrid-cell-main').appendChild(assignBtn);
    },
    selectable: true,
    select: (info) => {
      // console.log(info)

    },
    eventClick: (info) => {
      console.log(info)

    },
    eventMouseEnter: (info) => {
      // console.log(info)

    },
    eventsSet: (info) => {
      console.log('Events Load Completed');
      this.updateFlightSchedResources();
    },
    viewDidMount: (info) => {
      console.log(info);
      this.calendarApi = info.view.calendar;
    },
    eventDidMount: function (info) {

      console.log("Event Display");
      let flight = info.event.title.split(':');
      let flightNo = flight[0];

      let cityPair = flight[1];

      let element = info.el;
      let child = element.querySelector('div.fc-event-title');
      let spanhtml = "<div class='title-custom' style='display:flex;flex-direction:column;align-items:center;line-height: 1.2em;'>" +
        "<span>" + flightNo + "</span><span>" + cityPair + "</span></div>";
      child.innerHTML = spanhtml;

      // var tooltip = new Tooltip(info.el, {
      //   title: info.event.extendedProps.description,
      //   placement: 'top',
      //   trigger: 'hover',
      //   container: 'body'
      // });
    },
    events: []
  };

  aircraft_CalendarOptions: CalendarOptions = {
    schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
    plugins: [resourceTimelinePlugin, interactionPlugin],
    timeZone: 'UTC',
    headerToolbar: {
      // left: 'today prev,next myCustomButton',
      left: 'today prev,next',
      center: 'title',
      // right: 'resourceTimelineDay,resourceTimelineTenDay,resourceTimelineMonth,resourceTimelineYear'
      right: 'resourceTimelineDay,resourceTimelineMonth'
    },

    slotLabelFormat: { hour: 'numeric', minute: '2-digit', hour12: false },
    initialView: 'resourceTimelineDay',
    scrollTime: '00:00',
    height: 'auto',
    aspectRatio: 1.5,
    views: {},
    editable: false,
    resourceAreaColumns: [
      {
        field: 'registration',
        headerContent: 'Aircraft'
      },
      {
        field: 'description',
        headerContent: 'Start - End'
      }
    ],
    // refetchResourcesOnNavigate: true,
    resources: [],
    resourceLabelDidMount: (info) => {
      // var assignBtn = document.createElement('button');
      // assignBtn.innerHTML = '<span class="mat-button-wrapper"><mat-icon _ngcontent-eds-c10="" class="mat-icon notranslate ng-tns-c10-0 material-icons mat-icon-no-color" role="img" aria-hidden="true">more</mat-icon></span>';
      // assignBtn.style.margin = '0px 0px'
      // assignBtn.className = 'ng-tns-c10-0 pull-right mat-icon-button mat-button-base mat-primary'
      // assignBtn.addEventListener('click', evt => {
      //   console.log(info)
      //   this.setAssignment(info)
      // })

      // info.el.querySelector('.fc-datagrid-cell-main').appendChild(assignBtn);
    },
    selectable: true,
    select: (info) => {
      // console.log(info)
    },
    eventClick: (info) => {
      console.log(info.event._def)
      if (info.event._def.extendedProps.flightStatus == 'Scheduled') {
        // console.log(info.event._def)
        this.setASTD(info.event._def)
      }
    },
    eventMouseEnter: (info) => {
      // console.log(info)
    },
    eventsSet: (info) => {
      console.log('Events Load Completed');
      this.updateAircraftSchedResources();
    },
    viewDidMount: (info) => {
      console.log(info);
      this.calendarApi2 = info.view.calendar;
    },
    eventDidMount: function (info) {

      console.log("Event Display");
      let flight = info.event.title.split(':');
      let flightNo = flight[0];

      let cityPair = flight[1];

      let element = info.el;
      let child = element.querySelector('div.fc-event-title');
      let spanhtml = "<div class='title-custom' style='display:flex;flex-direction:column;align-items:center;line-height: 1.2em;'>" +
        "<span>" + flightNo + "</span><span>" + cityPair + "</span></div>";
      child.innerHTML = spanhtml;

      // var tooltip = new Tooltip(info.el, {
      //   title: info.event.extendedProps.description,
      //   placement: 'top',
      //   trigger: 'hover',
      //   container: 'body'
      // });
    },
    events: []
  };

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private aircraftSchedSrvc: AircraftScheduleService,
    private aircraftSrvc: AircraftService,
    private spinner: NgxSpinnerService,

  ) {

  }

  async ngOnInit() {
    await this.getFlightSchedData();
    await this.getAircraftSchedData();
    // await this.getAircrafts();
  }

  getFlightSchedData() {
    this.spinner.show()
    this.aircraftSchedSrvc.getResource().subscribe(res => {
      console.log(res)
      this.flight_CalendarOptions.resources = res
      this.aircraftSchedSrvc.getFlights().subscribe(res => {
        console.log(res)
        if (Array.isArray(res)) {
          res.sort((a, b) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0));

          this.events = res;
          this.flight_CalendarOptions.events = res
          this.spinner.hide()
        }
        else {
          this.spinner.hide()
          this.openSnackBar('Error while loading flights.')
        }

      })
    })
  }

  getAircraftSchedData() {
    this.spinner.show()
    this.aircraftSrvc.get().subscribe(res => {
      console.log(res)
      this.aircrafts = res
      this.aircraft_CalendarOptions.resources = res
      this.aircraftSchedSrvc.getAllEvents().subscribe(res => {
        console.log(res)
        if (Array.isArray(res)) {
          res.sort((a, b) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0));

          this.events2 = res;
          this.aircraft_CalendarOptions.events = res
          this.spinner.hide()
        }
        else {
          this.spinner.hide()
          this.openSnackBar('Error while loading flights.')
        }
      })
    })
  }

  getAircrafts(name?) {
    this.aircraftSrvc.get().subscribe(res => {
      console.log(res)
      const ac: any = res
      let result

      result = ac.filter(item => {
        return item.aircraftType.aircraftTypeName == name
      })
      console.log(result)
      this.aircrafts = result
    })
  }

  updateFlightSchedResources() {

    let calendar = this.calendarApi;
    console.log(calendar);

    let events = this.events;
    let loadDate = calendar.currentData.currentDate;

    let calendarRes

    calendarRes = this.flight_CalendarOptions.resources
    calendarRes.forEach(res => {
      console.log(res);
      let resource = calendar.getResourceById(res.id);
      console.log(resource);

      let filteredEvents = events.filter(a => a.resourceId === res.id);
      console.log(filteredEvents);

      let filteredDate = [];
      filteredEvents.forEach(element => {
        console.log(element);

        let flightDate = new Date(element.flightDetails.flightDate).getTime();
        let screenDate = new Date(loadDate.getFullYear(), loadDate.getMonth(), loadDate.getDate()).getTime();
        console.log(flightDate);
        console.log(flightDate);

        if (flightDate == screenDate)
          filteredDate.push(element);
      });

      //   console.log(filteredDate);
      let startchar = filteredDate.length > 0 ? filteredDate[0].flightDetails.airport_Origin.iatA_Code : "";
      let endchar = filteredDate.length > 0 ? filteredDate[filteredDate.length - 1].flightDetails.airport_Destination.iatA_Code : "";
      resource.setExtendedProp("description", startchar + "-" + endchar)


    });
    this.flight_CalendarOptions.resources = calendarRes;


  }

  updateAircraftSchedResources() {

    let calendar = this.calendarApi2;
    let events = this.events2;
    console.log(events);

    let loadDate = calendar.currentData.currentDate;

    let calendarRes

    calendarRes = this.aircraft_CalendarOptions.resources
    calendarRes.forEach(res => {
      let resource = calendar.getResourceById(res.id);
      console.log(resource);

      let filteredEvents = events.filter(a => a.resourceId === res.id);
      console.log(filteredEvents);

      let filteredDate = [];
      filteredEvents.forEach(element => {
        console.log(element);

        let flightDate = new Date(element.flightDetails.flightDate).getTime();
        let screenDate = new Date(loadDate.getFullYear(), loadDate.getMonth(), loadDate.getDate()).getTime();
        console.log(flightDate);
        console.log(screenDate);

        if (flightDate == screenDate)
          filteredDate.push(element);
      });

      //   console.log(filteredDate);
      let startchar = filteredDate.length > 0 ? filteredDate[0].flightDetails.airport_Origin.iatA_Code : "";
      let endchar = filteredDate.length > 0 ? filteredDate[filteredDate.length - 1].flightDetails.airport_Destination.iatA_Code : "";
      resource.setExtendedProp("description", startchar + "-" + endchar)


    });
    this.aircraft_CalendarOptions.resources = calendarRes;


  }

  setAssignment(info) {
    console.log(info)
    this.assignInfo = {};
    this.assignInfo.airlineScheduleID = info.extendedProps.airlineScheduleID;
    this.assignInfo.resourceID = info.id
    this.getAircrafts(info.extendedProps.name);
    // this.minDate = new Date(info.flightDetails.periodFrom.valueOf());
    // this.maxDate = new Date(info.flightDetails.periodTo.valueOf());
    const dialogRef = this.dialog.open(this.assignTmp, {
      width: '30%',

    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      return result
    });
  }

  assign(data: NgForm) {
    this.spinner.show()

    console.log(data.form.value)
    let info
    info = data.form.value
    info.airlineScheduleID = this.assignInfo.airlineScheduleID
    info.resourceID = parseInt(this.assignInfo.resourceID)
    info.From = moment(info.From).format('YYYY-MM-DDTHH:mm:ss');
    info.To = moment(info.To).format('YYYY-MM-DDTHH:mm:ss');
    console.log(info)

    this.aircraftSchedSrvc.assign(info).subscribe(async res => {
      console.log(res)
      await this.getAircraftSchedData();
      await this.getFlightSchedData();

      this.dialog.closeAll();
    })
  }

  setASTD(info) {
    console.log(info)

    this.assignInfo = {};
    this.assignInfo.periodFrom = info.extendedProps.aircraftSchedule.astd
    this.assignInfo.astd = moment(info.extendedProps.aircraftSchedule.flightSchedule.std).format('HH:mm')
    this.assignInfo.airlineScheduleID = info.extendedProps.aircraftSchedule.flightSchedule.airlineScheduleID;
    this.assignInfo.aircraftScheduleId = info.extendedProps.aircraftSchedule.id;
    this.assignInfo.resourceID = info.resourceIds[0]
    console.log(this.assignInfo)

    const dialogRef = this.dialog.open(this.astdTmp, {
      width: '30%',

    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      return result
    });
  }

  update(data: NgForm) {
    this.spinner.show()

    console.log(data.form.value)
    let info
    info = data.form.value
    info.airlineScheduleID = this.assignInfo.airlineScheduleID
    info.aircraftScheduleId = this.assignInfo.aircraftScheduleId
    info.resourceID = parseInt(this.assignInfo.resourceID)
    let initialdate = moment(this.assignInfo.periodFrom).format('YYYY-MM-DD');
    let start_time = info.astd;
    info.astd = (moment(initialdate + " " + start_time)).format('YYYY-MM-DDTHH:mm:ss')
    console.log(info)

    this.aircraftSchedSrvc.update(info).subscribe(async res => {
      console.log(res)
      await this.getAircraftSchedData();
      await this.getFlightSchedData();

      this.dialog.closeAll();
    })
  }

  openSnackBar(msg) {
    this._snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
