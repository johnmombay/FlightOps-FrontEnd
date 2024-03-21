import { Component, OnInit } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatTableDataSource } from '@angular/material';
import { AircraftTypeService } from 'src/app/api/aircraft/aircraft-type.service';
import { NgForm } from '@angular/forms';
import { AircraftService } from 'src/app/api/aircraft/aircraft.service';
import { CountriesService } from 'src/app/api/system/countries.service';
import { CategoryService } from 'src/app/api/system/category.service';

export class AircraftListElement {
  id: number;
  aircraftType: string;
  firstCapacity: number;
  businessCapacity: number;
  peconomyCapacity: number;
  economyCapacity: number;
  cargoCapacity: number;
  registration: string;
  countryOfRegistration: string;
  dateOfRegistration: any;
  airportCategory: string;
  maximumFlightHours: string;
  status: string;
  saircarft: string;
}

export class AircraftElement {
  ids: number;
  aircraftTypeName: string;
  make: string;
  NoOfAircraft: string;
}

@Component({
  selector: 'app-aircrafts',
  templateUrl: './aircrafts.component.html',
  styleUrls: ['./aircrafts.component.scss']
})
export class AircraftsComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'aircraftType',
    'firstCapacity',
    'businessCapacity',
    "peconomyCapacity",
    "economyCapacity",
    "cargoCapacity",
    "registration",
    "countryOfRegistration",
    "dateOfRegistration",
    "airportCategory",
    "maximumFlightHours",
    "status",
    "actions"
  ];

  dataSource: any;
  show_aircraftList: boolean = true
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  aircraftInfo: any = {}
  aircraftTypeData: any;
  countryData: any;
  categoryData: any;

  isUpdate: Boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private aircraftSrvc: AircraftService,
    private aircraftTypeSrvc: AircraftTypeService,
    public countrySrvc: CountriesService,
    public categorySrvc: CategoryService,

  ) {

  }

  async ngOnInit() {
    this.show_aircraftList = true;
    this.getAircrafts();
    await this.getAircrafttypes();
    await this.getCountries();
    await this.getCategories();

  }

  getAircrafts() {
    this.aircraftSrvc.get().subscribe(res => {
      console.log(res)
      let data
      data = res
      this.dataSource = new MatTableDataSource(data)
    })
  }

  getAircrafttypes() {
    this.aircraftTypeSrvc.get().subscribe(res => {
      console.log(res)
      let data
      data = res
      this.aircraftTypeData = data
    })
  }

  getCountries() {
    this.countrySrvc.get().subscribe(res => {
      console.log(res)
      let data
      data = res
      this.countryData = data
    })
  }

  getCategories() {
    this.categorySrvc.get().subscribe(res => {
      console.log(res)
      let data
      data = res
      this.categoryData = data
    })
  }

  save(data: NgForm) {
    console.log(data.form.value)
    let info
    info = data.form.value

    this.aircraftSrvc.create(info).subscribe(async res => {
      if (res != undefined) {
        await this.getAircrafts()
        this.show_aircraftList = true
        this.openSnackBar('New Aircraft added')
      } else {
        this.openSnackBar('Aircraft not added')
      }
    }), error => {
      // console.log(error)
    }
  }

  update(data: NgForm) {
    // console.log(data.form.value);
    let info
    info = data.form.value
    info.id = this.aircraftInfo.id

    this.aircraftSrvc.update(info).subscribe(async res => {
      if (res != undefined) {
        await this.getAircrafts()
        this.show_aircraftList = true
        this.aircraftInfo = {}
        this.openSnackBar('Aircraft updated')
      } else {
        this.openSnackBar('Aircraft not updated')
      }
    }), error => {
      // console.log(error)
    }
  }

  remove(data) {
    // console.log(data);
    this.aircraftSrvc.delete(data).subscribe(async res => {
      await this.getAircrafts()
      this.show_aircraftList = true
      this.openSnackBar('Aircraft removed')
    }), error => {
      console.log(error)
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackBar(msg) {
    this._snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
