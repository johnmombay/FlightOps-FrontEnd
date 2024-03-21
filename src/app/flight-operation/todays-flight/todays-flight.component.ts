import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, Calendar } from '@fullcalendar/angular';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AircraftScheduleService } from 'src/app/api/flight-operation/aircraft-schedule.service';
import { AircraftService } from 'src/app/api/aircraft/aircraft.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-todays-flight',
  templateUrl: './todays-flight.component.html',
  styleUrls: ['./todays-flight.component.scss']
})
export class TodaysFlightComponent implements OnInit {
  aircrafts: any;
  todays_CalendarOptions: CalendarOptions = {
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
        this.setActual(info.event._def)
      }
    },
    eventMouseEnter: (info) => {
      // console.log(info)
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

  ) { }

  ngOnInit() {
    this.getAircraftSchedData();
  }

  getAircraftSchedData() {
    this.spinner.show()
    this.aircraftSrvc.get().subscribe(res => {
      console.log(res)
      this.aircrafts = res
      this.todays_CalendarOptions.resources = res
      this.aircraftSchedSrvc.getAllEvents().subscribe(res => {
        console.log(res)
        this.spinner.hide()
        this.todays_CalendarOptions.events = res
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

  setActual(info) {
    console.log(info)
  }

}
