import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CalendarOptions, DateSelectArg, Calendar } from '@fullcalendar/angular';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { FormControl, NgForm, Validators, FormBuilder } from '@angular/forms';
import { MatTableDataSource, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';
import { rowsAnimation, detailExpand } from '../../animations/template.animations';
import * as moment from 'moment';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { AuthenticateService } from 'src/app/api/authenticate.service';
import { AircraftTypeService } from 'src/app/api/aircraft/aircraft-type.service';
import { AircraftService } from 'src/app/api/aircraft/aircraft.service';
import { AirlineScheduleService } from 'src/app/api/commercial-planning/airline-schedule.service';
import { FlightscheduleService } from 'src/app/api/commercial-planning/flightschedule.service';
import { AirportsService } from 'src/app/api/system/airports.service';

export interface schedElement { // schedElement properties
  id: number;
  scheduleName: string;
  periodFrom: Date;
  periodTo: Date;
}

export interface aircraftElement { // aircraftElement properties
  id: number;
  schedId: number;
  aircraftTypeId: number;
  aircraftType: string;
  quantity: number;
}

export interface aircraftTypeElement { // aircraftTypeElement properties
  id: number;
  aircraftTypeName: string;
  count: number;
}

@Component({
  selector: 'app-flight-schedule',
  templateUrl: './flight-schedule.component.html',
  styleUrls: ['./flight-schedule.component.scss'],
  animations: [rowsAnimation, detailExpand],
})

export class FlightScheduleComponent implements OnInit {
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
  expandedElement: any;
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');

  sched_displayedColumns: string[] = ['id', 'scheduleName', 'periodFrom', 'periodTo', 'actions'];  // displayed column for sched_dataSource
  aircraft_displayedColumns: string[] = ['aircraftType', 'quantity']; // displayed column for aircraft_dataSource
  sched_dataSource: any;

  // components show/hide
  show_flightschedList: boolean = true
  show_schedCalendar: boolean = false
  show_flightCalendar: boolean = false
  show_createSched: boolean = false
  // -->

  daysList: any = [ // days of week
    { id: 0, label: 'Sun' },
    { id: 1, label: 'Mon' },
    { id: 2, label: 'Tue' },
    { id: 3, label: 'Wed' },
    { id: 4, label: 'Thu' },
    { id: 5, label: 'Fri' },
    { id: 6, label: 'Sat' },

  ];
  airports: any;
  @Input() max: any;
  minDate = new Date();
  maxDate = new Date();

  public flightData: any;
  isUpdate: Boolean;
  calendarApi: any;
  events: any = [];

  calendarOptions: CalendarOptions = {
    schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
    plugins: [resourceTimelinePlugin, interactionPlugin],
    timeZone: 'UTC',
    headerToolbar: {
      // left: 'today prev,next myCustomButton',
      left: 'today prev,next',
      center: 'title',
      // right: 'resourceTimelineDay,resourceTimelineTenDay,resourceTimelineMonth,resourceTimelineYear'
      right: 'resourceTimelineDay,resourceTimelineTenDay,resourceTimelineMonth'
    },

    slotLabelFormat: { hour: 'numeric', minute: '2-digit', hour12: false },
    // initialView: 'resourceTimeline',
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
    selectable: true,
    select: (info) => {
      console.log(info)
      this.flightData = {}
      this.isUpdate = false
      this.show_schedCalendar = false
      this.show_flightCalendar = true
      this.selectedInfo = info
      console.log(this.selectedInfo)
      this.selectedResource = info.resource._resource;
      console.log(this.selectedResource)

      this.flightInput.aircraftType = this.getAircraftType(this.selectedResource.extendedProps.aircraftTypeId);
      this.flightInput.schedId = this.selectedResource.extendedProps.schedId;

      this.minDate = new Date(this.schedData.periodFrom.valueOf());
      this.maxDate = new Date(this.schedData.periodTo.valueOf());
      console.log(this.minDate)
      console.log(this.maxDate)

    },
    eventClick: (info) => {
      this.flightData = {}
      console.log(info)
      this.selectedEvent = info.event._def.publicId

      this.flightSchedSrvc.get(this.selectedEvent).subscribe(res => {
        const data = JSON.parse(JSON.stringify(res))
        let formattedData
        formattedData = JSON.parse(JSON.stringify(res))
        console.log(formattedData)
        this.minDate = new Date(formattedData.periodFrom.valueOf());
        this.maxDate = new Date(formattedData.periodTo.valueOf());
        formattedData.std = moment(data.std).format('HH:mm')
        formattedData.sta = moment(data.sta).format('HH:mm')
        let daysArray = []
        let daystoString = ''
        daystoString = ((formattedData.days.replace('[', '')).replace(']', '')).replace(/,/g, '')
        console.log(daystoString)

        for (var i = 0, len = daystoString.length; i < len; i += 1) {
          daysArray.push(+daystoString.charAt(i));
        }
        console.log(daysArray)
        formattedData.days = daysArray;
        let dateToday = moment(new Date()).format('YYYY-MM-DD');
        let initTime = "00:00"
        formattedData.blockTime = moment(dateToday + " " + initTime).add(data.blockTime, 'minutes').format('HH:mm')
        formattedData.flyingHours = moment(dateToday + " " + initTime).add(data.flyingHours, 'minutes').format('HH:mm')
        console.log(formattedData)
        this.flightData = formattedData
        this.isUpdate = true
        this.show_schedCalendar = false
        this.show_flightCalendar = true
      })
      // change the border color just for fun
      // info.el.style.borderColor = 'red';
    },
    eventMouseEnter: (info) => {

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
    events: [

    ]
  };

  public quantity: any = {};
  public fieldArray: Array<any> = [];
  public newAttribute: any = {};
  public flightInput: any = {};

  aircraftTypes: any;
  aircraftList: any;
  schedData: any = {};
  public selectedResource: any = {};
  public selectedEvent: any = {};
  public selectedInfo: any = {};
  aircraftType: any;
  minutes: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  schedInfo: any = {}

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public authSrvc: AuthenticateService,
    public aircraftTypeSrvc: AircraftTypeService,
    public aircraftSrvc: AircraftService,
    public airlineSchedSrvc: AirlineScheduleService,
    public flightSchedSrvc: FlightscheduleService,
    public airportSrvc: AirportsService,

  ) {

  }

  async ngOnInit() {
    await this.getSchedules()
    await this.getAircrafts();
    await this.getAirports();

    this.show_flightschedList = true;
    this.show_schedCalendar = false;
    this.show_flightCalendar = false;
    this.show_createSched = false;

  }

  getAirports() {
    this.airportSrvc.get().subscribe(res => {
      console.log(res)
      this.airports = res
    });
  }

  getAircrafts() {
    this.aircraftSrvc.get().subscribe(res => {
      console.log(res)
      this.aircraftList = res

      this.aircraftTypeSrvc.get().subscribe(res => {
        console.log(res)
        this.aircraftTypes = res

        this.aircraftTypes.forEach(act => {
          let count = 0
          this.aircraftList.forEach(acl => {
            if (act.id == acl.aircraftTypeId) {
              count = count + 1
            }
          });
          act.count = count
        });

        console.log(this.aircraftTypes)

      })
    })
  }

  getSchedules() {
    this.airlineSchedSrvc.get().subscribe(res => {
      console.log(res)
      let data
      data = res
      const rows = [];
      data.forEach(element => rows.push(element, { detailRow: true, element }));
      console.log(rows)
      this.sched_dataSource = new MatTableDataSource(rows)
    })
  }

  getEventsbyResourceID(id) {
    this.flightSchedSrvc.getbyResourceID(id).subscribe(res => {
      // console.log(res)
      // let resEvents
      // resEvents = res
      // let eventsArray = []
      // resEvents.forEach(element => {
      //   eventsArray.push(element)
      // });
      if (Array.isArray(res)) {
        res.sort((a, b) => (a.start > b.start) ? 1 : ((b.start > a.start) ? -1 : 0));

        this.events = res;
        this.calendarOptions.events = res;
      }
      else {
        this.openSnackBar('Error while loading flights.')
      }
      console.log(this.calendarOptions.events)
    })
  }

  updateResources() {

    let calendar = this.calendarApi;
    console.log(calendar);

    let events = this.events;
    let loadDate = calendar.currentData.currentDate;

    let calendarRes

    calendarRes = this.calendarOptions.resources
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
        console.log(screenDate);

        if (flightDate == screenDate)
          filteredDate.push(element);
      });

      //   console.log(filteredDate);
      let startchar = filteredDate.length > 0 ? filteredDate[0].flightDetails.airport_Origin.iatA_Code : "";
      let endchar = filteredDate.length > 0 ? filteredDate[filteredDate.length - 1].flightDetails.airport_Destination.iatA_Code : "";
      resource.setExtendedProp("description", startchar + "-" + endchar)


    });
    this.calendarOptions.resources = calendarRes;


  }

  openDialog(templateRef) {
    const dialogRef = this.dialog.open(templateRef, {
      width: '30%',

    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      return result
    });
  }

  updateTimes(timeInfo, data: NgForm) {
    // console.log(data.form.value)
    let std = data.form.value.std
    let sta = data.form.value.sta
    let bt = data.form.value.blockTime
    let minutes = 0;

    switch (timeInfo) {
      case 'std':
        if (bt != undefined || sta != undefined) {
          if (bt != undefined) {
            let timeValue = bt
            let dateToday = moment(new Date()).format('YYYY-MM-DD');
            let initTime = "00:00"
            let a = moment(dateToday + " " + initTime)
            let b = moment(dateToday + " " + timeValue)
            minutes = b.diff(a, 'minutes')
            this.flightData.sta = moment(dateToday + " " + std).add(minutes, 'minutes').format('HH:mm')
          } else {
            let timeValue = sta
            let dateToday = moment(new Date()).format('YYYY-MM-DD');
            let initTime = "00:00"
            let a = moment(dateToday + " " + std)
            let b = moment(dateToday + " " + timeValue)
            minutes = b.diff(a, 'minutes')
            this.flightData.blockTime = moment(dateToday + " " + initTime).add(minutes, 'minutes').format('HH:mm')
          }
        }
        break;

      case 'sta':
        if (bt != undefined || sta != undefined) {
          if (bt != undefined) {
            let timeValue = bt
            let dateToday = moment(new Date()).format('YYYY-MM-DD');
            let initTime = "00:00"
            let a = moment(dateToday + " " + initTime)
            let b = moment(dateToday + " " + timeValue)
            minutes = b.diff(a, 'minutes')
            this.flightData.std = moment(dateToday + " " + sta).subtract(minutes, 'minutes').format('HH:mm')
          } else {
            let timeValue = sta
            let dateToday = moment(new Date()).format('YYYY-MM-DD');
            let initTime = "00:00"
            let a = moment(dateToday + " " + std)
            let b = moment(dateToday + " " + timeValue)
            minutes = b.diff(a, 'minutes')
            this.flightData.blockTime = moment(dateToday + " " + initTime).add(minutes, 'minutes').format('HH:mm')
          }
        }
        break

      case 'bt':
        if (std != undefined || sta != undefined) {
          let timeValue = bt
          let dateToday = moment(new Date()).format('YYYY-MM-DD');
          let initTime = "00:00"
          let a = moment(dateToday + " " + initTime)
          let b = moment(dateToday + " " + timeValue)
          minutes = b.diff(a, 'minutes')
          std != undefined ? this.flightData.sta = moment(dateToday + " " + std).add(minutes, 'minutes').format('HH:mm') : this.flightData.std = moment(dateToday + " " + sta).subtract(minutes, 'minutes').format('HH:mm')
        }
        break;

      default:
        break;
    }
  }

  addFieldValue() {
    console.log(this.newAttribute)
    if (this.checkCount(this.newAttribute.aircraftTypeId, this.newAttribute.quantity)) {

      if (this.checkDuplicate(this.newAttribute.aircraftTypeId) != true) {

        this.newAttribute.aircraftTypeName = this.getAircraftType(this.newAttribute.aircraftTypeId);
        console.log(this.newAttribute);

        this.fieldArray.push(this.newAttribute)
        this.newAttribute = {};

      } else {
        this.fieldArray.forEach(field => {
          if (field.id == this.newAttribute.aircraftTypeId) {
            field.quantity = this.newAttribute.quantity
          }
        })
      }

      this.newAttribute = {};

    } else {
      this.openSnackBar('Quantity input is greater than available aircrafts')
    }

    console.log(this.fieldArray);
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  save(data: NgForm, templateRef) {
    console.log(data.form.value)
    console.log(this.fieldArray)

    let info
    info = data.form.value
    info.aircraftTypes = this.fieldArray
    info.periodFrom = moment(info.periodFrom).format('YYYY-MM-DDTHH:mm:ss');
    info.periodTo = moment(info.periodTo).format('YYYY-MM-DDTHH:mm:ss');

    console.log(info)

    const dialogRef = this.dialog.open(templateRef, {
      width: '30%',

    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);

      if (result) {
        this.airlineSchedSrvc.create(info).subscribe(async res => {
          if (res != undefined) {
            await this.getSchedules()
            this.show_createSched = false;
            this.show_flightschedList = true;
            this.openSnackBar('New Schedule added')
          } else {
            this.openSnackBar('Schedule not added')
          }
        }), error => {
          // console.log(error)
        }
      }
    });

  }

  remove(data, templateRef) {
    // console.log(data);
    const dialogRef = this.dialog.open(templateRef, {
      width: '30%',

    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);

      if (result) {
        this.airlineSchedSrvc.delete(data).subscribe(async res => {
          await this.getSchedules()
          this.show_flightschedList = true
          this.openSnackBar('Schedule removed')
        }), error => {
          console.log(error)
        }
      }
    });

  }

  onUpdate(data) {
    this.fieldArray = []
    this.isUpdate = true;
    this.show_flightschedList = false;
    this.show_createSched = true;
    this.schedInfo = data;

    this.schedInfo.aircraftTypes.forEach(type => {
      let dataSet = {
        aircraftTypeName: type.aircraftType.aircraftTypeName,
        quantity: type.quantity
      }
      this.fieldArray.push(dataSet)
    })


    console.log(this.fieldArray)

  }

  update(data: NgForm, templateRef) {
    // console.log(data.form.value);
    let info
    info = data.form.value
    info.id = this.schedInfo.id

    const dialogRef = this.dialog.open(templateRef, {
      width: '30%',

    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      if (result) {

        this.airlineSchedSrvc.update(info).subscribe(async res => {
          if (res != undefined) {
            await this.getSchedules()
            this.show_createSched = false;
            this.show_flightschedList = true;
            this.schedInfo = {}
            this.openSnackBar('Schedule updated')
          } else {
            this.openSnackBar('Schedule not updated')
          }
        }), error => {
          // console.log(error)
        }
      }

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.sched_dataSource.filter = filterValue.trim().toLowerCase();
  }

  getMinutes(time) {
    let minutes
    let dateToday = moment(new Date()).format('YYYY-MM-DD');
    let initTime = "00:00"
    let c = moment(dateToday + " " + initTime)
    let d = moment(dateToday + " " + time)

    minutes = d.diff(c, 'minutes')

    return minutes
  }

  checkSchedAvailability(dates, flightInfo) {
    // console.log(dates)
    // console.log(flightInfo)

    let existingEvents
    existingEvents = this.calendarOptions.events
    // console.log(existingEvents)
    let departureDate
    let arrivalDate
    let conflictScheds = 0
    let conflictArray = []
    dates.forEach(date => {
      departureDate = moment(date.startDate)
      arrivalDate = moment(date.endDate)

      existingEvents.filter((item) => {
        if (item.resourceId == flightInfo.resourceId) {
          if (moment(item.start).format('YYYY-MM-DD') == departureDate.format('YYYY-MM-DD')) {
            // console.log(departureDate)
            // console.log(arrivalDate)
            // console.log(item.start)
            // console.log(item.end)
            if ((departureDate >= (moment(item.start)) && departureDate < (moment(item.end))) || (arrivalDate > (moment(item.start)) && arrivalDate <= (moment(item.end)))) {
              conflictScheds = conflictScheds + 1
              conflictArray.push({ start: item.start, end: item.end })
            }
          }
        }
      });
    });

    console.log(conflictScheds)
    console.log(conflictArray)

    return conflictArray
  }

  async saveFlightSched(data: NgForm, templateRef) {
    console.log(data.form.value)
    let req
    req = data.form.value

    req.resourceId = this.selectedResource.id
    req.airlineScheduleID = this.schedData.id
    req.aircraftTypeID = this.selectedResource.extendedProps.aircraftTypeId
    req.status = 1

    req.periodFrom = moment(req.periodFrom).format('YYYY-MM-DDTHH:mm:ss');
    req.periodTo = moment(req.periodTo).format('YYYY-MM-DDTHH:mm:ss');

    console.log(req)
    let eventDays
    eventDays = this.getDays(req)
    console.log(eventDays);
    let conflicts
    conflicts = await this.checkSchedAvailability(eventDays, req)
    console.log(conflicts)

    if (eventDays.length > 0) {

      if (conflicts.length > 0) {

        this.openSnackBar('Conflict on other schedule (' + moment(conflicts[0].start).format('YYYY-MM-DD HH:mm') + ' - ' + moment(conflicts[0].end).format('YYYY-MM-DD HH:mm') + ')')
      } else {

        const dialogRef = this.dialog.open(templateRef, {
          width: '30%',

        });

        dialogRef.afterClosed().subscribe(async result => {
          // console.log(`Dialog result: ${result}`);

          if (result) {
            let initialdate = moment(req.periodFrom).format('YYYY-MM-DD');
            let start_time = req.std;
            let enddate = moment(req.periodTo).format('YYYY-MM-DD');
            let end_time = req.sta;
            req.days = JSON.stringify(req.days)
            req.std = (moment(initialdate + " " + start_time)).format('YYYY-MM-DDTHH:mm:ss')
            req.sta = (moment(enddate + " " + end_time)).format('YYYY-MM-DDTHH:mm:ss')
            req.blockTime = this.getMinutes(req.blockTime)
            req.flyingHours = this.getMinutes(req.flyingHours)

            this.flightSchedSrvc.create(req).subscribe(async res => {
              this.getEventsbyResourceID(req.airlineScheduleID)

              this.show_flightCalendar = await false
              this.show_schedCalendar = await true

              console.log(res)
            })
          }

        });
      }
    } else {
      this.openSnackBar('Selected days are not available on the Date Range')
    }
  }

  async updateFlightSched(data: NgForm, templateRef) {
    console.log(data)
    console.log(data.form.value)

    let req
    req = data.form.value

    req.resourceId = this.flightData.resourceId
    req.airlineScheduleID = this.flightData.airlineScheduleID
    req.aircraftTypeID = this.flightData.aircraftTypeID
    req.status = 1

    req.periodFrom = moment(req.periodFrom).format('YYYY-MM-DDTHH:mm:ss');
    req.periodTo = moment(req.periodTo).format('YYYY-MM-DDTHH:mm:ss');

    console.log(req)
    let eventDays
    eventDays = this.getDays(req)
    console.log(eventDays);
    let conflicts
    conflicts = await this.checkSchedAvailability(eventDays, req)
    console.log(conflicts)

    if (eventDays.length > 0) {

      if (conflicts.length > 0) {

        this.openSnackBar('Conflict on other schedule (' + moment(conflicts[0].start).format('YYYY-MM-DD HH:mm') + ' - ' + moment(conflicts[0].end).format('YYYY-MM-DD HH:mm') + ')')
      } else {

        const dialogRef = this.dialog.open(templateRef, {
          width: '30%',

        });

        dialogRef.afterClosed().subscribe(async result => {
          // console.log(`Dialog result: ${result}`);

          if (result) {
            let initialdate = moment(req.periodFrom).format('YYYY-MM-DD');
            let start_time = req.std;
            let enddate = moment(req.periodTo).format('YYYY-MM-DD');
            let end_time = req.sta;
            req.days = JSON.stringify(req.days)
            req.std = (moment(initialdate + " " + start_time)).format('YYYY-MM-DDTHH:mm:ss')
            req.sta = (moment(enddate + " " + end_time)).format('YYYY-MM-DDTHH:mm:ss')
            req.blockTime = this.getMinutes(req.blockTime)
            req.flyingHours = this.getMinutes(req.flyingHours)

            this.flightSchedSrvc.create(req).subscribe(async res => {
              this.getEventsbyResourceID(req.airlineScheduleID)

              this.show_flightCalendar = await false
              this.show_schedCalendar = await true

              console.log(res)
            })
          }

        });
      }
    } else {
      this.openSnackBar('Selected days are not available on the Date Range')
    }
  }

  deleteFlight(data, templateRef) {
    console.log(data)
    const dialogRef = this.dialog.open(templateRef, {
      width: '30%',

    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      if (result) {
        this.flightSchedSrvc.delete(data.id).subscribe(async res => {
          console.log(res)
          if (res != undefined) {
            await this.getSchedules()
            this.show_createSched = false;
            this.show_flightschedList = true;
            this.openSnackBar('Flight Schedule deleted')
          } else {
            this.openSnackBar('Failed to delete Flight Schedule')
          }
        }), error => {
          // console.log(error)
        }
      }
    });
  }

  openSnackBar(msg) {
    this._snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  getDays(fdata) {
    let dates = [];
    let newDay = {}
    console.log(fdata)
    // let interval = fdata.flightType == 0 ? 30 : 45;
    let interval;
    let groundTime = fdata.groundTime
    console.log(groundTime)
    let dateToday = moment(new Date()).format('YYYY-MM-DD');
    let initTime = "00:00"
    let c = moment(dateToday + " " + initTime)
    let d = moment(dateToday + " " + groundTime)

    interval = d.diff(c, 'minutes')
    interval = 45;
    console.log(interval)

    let initialdate = moment(fdata.periodFrom).format('YYYY-MM-DD');
    let start_time = fdata.std;
    let enddate = moment(fdata.periodTo).format('YYYY-MM-DD');
    let end_time = fdata.sta;


    // console.log(initialdate)
    // console.log(start_time)
    // console.log(enddate)
    // console.log(end_time)

    let startDate
    startDate = (moment(initialdate + " " + start_time).subtract(1, 'days')).startOf('day');
    let endDate
    endDate = (moment(enddate + " " + end_time).add(1, 'days')).startOf('day');
    // console.log(startDate);
    // console.log(endDate);
    let a = moment(initialdate + " " + start_time)
    let b = moment(initialdate + " " + end_time)
    // console.log(a);
    // console.log(b);

    let duration = b.diff(a, 'minutes')
    // console.log(duration);


    let currDate = startDate
    let lastDate = endDate

    while (currDate.add(1, 'days').diff(lastDate) < 0) {
      newDay = {}
      let sDate_formnatted = moment(currDate.clone().toDate()).format('YYYY-MM-DD');
      let sDate = moment(sDate_formnatted + " " + start_time).format('YYYY-MM-DDTHH:mm:ss')
      let eDate_formnatted = moment(currDate.clone().toDate()).format('YYYY-MM-DD');
      let eDate = moment(eDate_formnatted + " " + end_time).format('YYYY-MM-DDTHH:mm:ss')
      newDay = {
        startDate: sDate,
        endDate: eDate,
        day: (currDate.toDate()).getDay()
      }

      fdata.days.forEach(day => {
        if (day == (currDate.toDate()).getDay()) {
          dates.push(newDay);
          if (fdata.isReturn) {

            let return_start_time = moment(end_time, 'HH:mm').add(interval, 'minutes').format('HH:mm');
            let return_end_time = moment(return_start_time, 'HH:mm').add(duration, 'minutes').format('HH:mm');

            while (currDate.add(1, 'days').diff(lastDate) < 0) {
              let sDate_formnatted = moment(currDate.clone().toDate()).format('YYYY-MM-DD');
              let sDate = moment(sDate_formnatted + " " + return_start_time).format('YYYY-MM-DDTHH:mm:ss')
              let eDate_formnatted = moment(currDate.clone().toDate()).format('YYYY-MM-DD');
              let eDate = moment(eDate_formnatted + " " + return_end_time).format('YYYY-MM-DDTHH:mm:ss')
              newDay = {
                startDate: sDate,
                endDate: eDate,
                day: (currDate.toDate()).getDay()
              }

              fdata.days.forEach(day => {
                if (day == (currDate.toDate()).getDay()) {
                  dates.push(newDay);
                }
              });
            }

          }
        }
      });
    }

    console.log(dates)
    return dates
  }

  sortData(data, point) {
    return data.sort((a, b) => {
      return <any>moment(a[point]) - <any>moment(b[point]);
    });
  }

  getStart(id) {
    let start = ''
    console.log(this.calendarOptions.events)
    let eventsArray: any = []
    eventsArray = this.calendarOptions.events
    if (eventsArray.length <= 0) {
      start = ''
      return start
    } else {
      // console.log(id)

      let sameResId
      sameResId = eventsArray.filter(a => a.resourceId == id)
      // console.log(sameResId)
      if (sameResId.length <= 0) {
        start = ''
        return start
      }
      let sortEvents
      sortEvents = this.sortData(sameResId, 'start')
      console.log(sortEvents)
      this.flightSchedSrvc.get(sortEvents[0].id).subscribe(async res => {
        let flight
        flight = res
        console.log(flight)
        start = await this.getLabel(flight.airport_OriginID, this.airports)
        console.log(start)
        return await start
      });

    }
  }

  getEnd(id) {
    let end
    // console.log(this.calendarOptions.events)
    let eventsArray: any = []
    eventsArray = this.calendarOptions.events
    if (eventsArray.length <= 0) {
      end = ''
      return end
    } else {
      // console.log(id)
      let sameResId
      sameResId = eventsArray.filter(a => a.resourceId == id)
      // console.log(sameResId)
      if (sameResId.length <= 0) {
        end = ''
        return end
      }
      let sortEvents
      sortEvents = this.sortData(sameResId, 'end')
      console.log(sortEvents)
      this.flightSchedSrvc.get(sortEvents[sortEvents.length - 1].id).subscribe(async res => {
        let flight
        flight = res
        console.log(flight)
        end = await this.getLabel(flight.airport_DestinationID, this.airports)
        console.log(end)
        return await end
      });

    }
  }

  getAircraftTypeId(name, dataSet) {
    let id
    dataSet.forEach(data => {
      if (name == data.aircraftType.aircraftTypeName) {
        id = data.aircraftType.id
      }
    });
    return id
  }

  async selectSched(data) {
    console.log(data)
    this.schedData = data
    let schedResources
    schedResources = []
    // await data.scheduleResources.forEach(async element => {
    //   let temp;
    //   temp = {
    //     id: element.id,
    //     title: element.name,
    //     aircraftTypeId: this.getAircraftTypeId(element.name, data.aircraftTypes)
    //   }
    //   schedResources.push(temp)
    // });
    this.calendarOptions.resources = data.scheduleResources
    console.log(this.calendarOptions.resources)
    let startDate = new Date(data.periodFrom.valueOf());
    let endDate = new Date(data.periodTo.valueOf());

    // Adjust the start & end dates, respectively
    startDate.setDate(startDate.getDate() + 1);
    endDate.setDate(endDate.getDate() + 1);

    this.calendarOptions.initialDate = startDate

    this.calendarOptions.views = {
      resourceTimelineDay: {
        buttonText: 'Default',
        slotDuration: '01:00',
        initialDate: startDate,
      },
      resourceTimelineTenDay: {
        type: 'resourceTimeline',
        visibleRange: {
          start: startDate,
          end: endDate
        },
        buttonText: 'Schedule Range'
      }
    }
    this.calendarOptions.initialView = 'resourceTimelineDay'

    await this.getEventsbyResourceID(data.id)
  }

  getLabel(id, data) {
    let val;
    data.forEach(element => {
      // console.log(element)
      if (id == element.id) {
        // console.log(element)
        val = element.airportName
      }
    });
    // console.log(val)
    return val
  }

  getAircraftType(id) {
    let val;
    this.aircraftTypes.forEach(element => {
      // console.log(element)
      if (id == element.id) {
        // console.log(element)
        val = element.aircraftTypeName
      }
    });
    // console.log(val)
    return val
  }

  checkDuplicate(id) {
    let dup;
    dup = false
    this.fieldArray.forEach(element => {
      // console.log(element)
      if (id == element.id) {
        // console.log(element)
        dup = true
      }
    });
    // console.log(dup)
    return dup
  }

  checkCount(id, count) {
    let cnt;
    cnt = false
    this.aircraftTypes.forEach(element => {
      if (element.id == id) {
        if (count <= element.count) {
          cnt = true
        }
      }
    });
    // console.log(cnt)
    return cnt
  }

  militaryTime(data) {
    let formattedTime;
    let time = data;
    let hours = Number(time.match(/^(\d+)/)[1]);
    let minutes = Number(time.match(/:(\d+)/)[1]);
    let AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    let sHours = hours.toString();
    let sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    console.log(sHours + ":" + sMinutes + ":" + '00');
    formattedTime = sHours + ":" + sMinutes + ":" + '00';
    return formattedTime
  }

}
