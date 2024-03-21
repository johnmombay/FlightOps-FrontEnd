import { Component, OnInit } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatTableDataSource } from '@angular/material';
import { AirportsService } from 'src/app/api/system/airports.service';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/api/system/category.service';
import { CitiesService } from 'src/app/api/system/cities.service';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

export interface PeriodicElement {
  id: number;
  airportName: string;
  icaoCode: string;
  iataCode: string;
  cityId: string;
  address: string;
  category: string;

}

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.scss']
})
export class AirportsComponent implements OnInit {
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

  displayedColumns: string[] = ['id', 'airportName', 'icaoCode', 'iataCode', 'cityId', 'address', 'category', 'actions'];
  dataSource: any;
  show_airportsList: boolean = true
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  airportInfo: any = {}
  isUpdate: Boolean = false;
  cityList: any = []
  categoryList: any = []

  constructor(
    private _snackBar: MatSnackBar,
    public airportSrvc: AirportsService,
    public categorySrvc: CategoryService,
    public citiesSrvc: CitiesService,

  ) {

  }

  async ngOnInit() {
    this.show_airportsList = true;
    await this.getAirports()
    await this.getCities()
    await this.getCategories()
  }

  getCities() {
    this.citiesSrvc.get().subscribe(res => {
      console.log(res)
      this.cityList = res
    })
  }

  getCategories() {
    this.categorySrvc.get().subscribe(res => {
      console.log(res)
      this.categoryList = res
    })
  }

  getAirports() {
    this.airportSrvc.get().subscribe(res => {
      console.log(res)
      let data
      data = res
      this.dataSource = new MatTableDataSource(data)
    })
  }

  save(data: NgForm) {
    // console.log(data.form.value)
    let info
    info = data.form.value

    this.airportSrvc.create(info).subscribe(async res => {
      if (res != undefined) {
        await this.getAirports()
        this.show_airportsList = true
        this.openSnackBar('New Airport added')
      } else {
        this.openSnackBar('Airport not added')
      }
    }), error => {
      // console.log(error)
    }
  }

  update(data: NgForm) {
    // console.log(data.form.value);
    let info
    info = data.form.value
    info.id = this.airportInfo.id

    this.airportSrvc.update(info).subscribe(async res => {
      if (res != undefined) {
        await this.getAirports()
        this.show_airportsList = true
        this.airportInfo = {}
        this.openSnackBar('Airport updated')
      } else {
        this.openSnackBar('Airport not updated')
      }
    }), error => {
      // console.log(error)
    }
  }

  remove(data) {
    // console.log(data);
    this.airportSrvc.delete(data).subscribe(async res => {
      await this.getAirports()
      this.show_airportsList = true
      this.openSnackBar('Airport removed')
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
