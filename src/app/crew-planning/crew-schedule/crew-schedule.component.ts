import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, Calendar } from '@fullcalendar/angular';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { CrewScheduleService } from 'src/app/api/crew-planning/crew-schedule.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-crew-schedule',
  templateUrl: './crew-schedule.component.html',
  styleUrls: ['./crew-schedule.component.scss']
})
export class CrewScheduleComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  calendarApi: any;
  events: any = [];
  resources: any = [];
  CalendarOptions: CalendarOptions = {
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
        headerContent: 'Aircraft'
      },
      {
        field: 'description',
        headerContent: 'Start - End'
      }
    ],
    // refetchResourcesOnNavigate: true,
    resources: [],
    selectable: true,
    select: (info) => {
      console.log("select")

    },
    eventClick: (info) => {
      console.log("click")

    },
    eventMouseEnter: (info) => {
      console.log("mouse")

    },
    eventsSet: (info) => {
      console.log('Events Load Completed');
      this.updateResources();
    },
    viewDidMount: (info) => {
      console.log("View");
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
    events: this.events
  };
  constructor(private _snackBar: MatSnackBar, public schedSvc: CrewScheduleService) { }

  async ngOnInit() {
    await this.loadResources();
    await this.loadEvents();
  }

  loadResources() {
    console.log("Resource");
    this.schedSvc.getResources().subscribe(res => {
      // console.log(res)

      if (Array.isArray(res)) {
        this.CalendarOptions.resources = res;
      }
      else {
        this.openSnackBar('Error while loading resources.');
      }
    });
  }

  updateResources() {

    let calendar = this.calendarApi;
    let events = this.events;
    let loadDate = calendar.currentData.currentDate;

    let calendarRes

    calendarRes = this.CalendarOptions.resources
    calendarRes.forEach(res => {
      let resource = calendar.getResourceById(res.id);

      let filteredEvents = events.filter(a => a.resourceId === res.id);

      let filteredDate = [];
      filteredEvents.forEach(element => {
        let flightDate = new Date(element.flightDetails.flightDate).getTime();
        let screenDate = new Date(loadDate.getFullYear(), loadDate.getMonth(), loadDate.getDate()).getTime();

        if (flightDate == screenDate)
          filteredDate.push(element);
      });

      //   console.log(filteredDate);
      let startchar = filteredDate.length > 0 ? filteredDate[0].flightDetails.airport_Origin.iatA_Code : "";
      let endchar = filteredDate.length > 0 ? filteredDate[filteredDate.length - 1].flightDetails.airport_Destination.iatA_Code : "";
      resource.setExtendedProp("description", startchar + "-" + endchar)


    });
    this.CalendarOptions.resources = calendarRes;


  }
  loadEvents() {
    console.log("Events");
    this.schedSvc.getList().subscribe(res => {
      //  console.log(res);
      if (Array.isArray(res)) {
        res.sort((a, b) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0));

        this.events = res;
        this.CalendarOptions.events = res;
      }
      else {
        this.openSnackBar('Error while loading flights.')
      }
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
