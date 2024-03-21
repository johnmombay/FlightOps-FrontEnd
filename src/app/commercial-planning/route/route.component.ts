import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  id: number;
  origin: string;
  destination: string;
  tripHours: string;
  flightHours: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, origin: '', destination: '', tripHours: '', flightHours: ''},
  {id: 2, origin: '', destination: '', tripHours: '', flightHours: ''},
  {id: 3, origin: '', destination: '', tripHours: '', flightHours: ''},
  {id: 4, origin: '', destination: '', tripHours: '', flightHours: ''},
  {id: 5, origin: '', destination: '', tripHours: '', flightHours: ''},
];
@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {

  displayedColumns: string[] = ['id', 'origin', 'destination', 'tripHours', 'flightHours'];
  dataSource = ELEMENT_DATA;
  show_routeList: boolean = true

  constructor() {

  }

  ngOnInit() {
    this.show_routeList = true;
  }

}
