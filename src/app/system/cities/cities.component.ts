import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { CitiesService } from 'src/app/api/system/cities.service';
import { NgForm } from '@angular/forms';
import { CountriesService } from 'src/app/api/system/countries.service';

export interface PeriodicElement {
  id: number;
  cityCode: string;
  cityName: string;
  countryId: number;
}

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'cityCode', 'cityName', 'countryId', 'actions'];
  dataSource: any;
  show_cityList: boolean = true
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  cityInfo: any = {}
  isUpdate: Boolean = false;
  countryList: any = []

  constructor(
    private _snackBar: MatSnackBar,
    public citiesSrvc: CitiesService,
    public countrySrvc: CountriesService,

  ) {

  }

  async ngOnInit() {
    this.show_cityList = true;
    await this.getCities()
    this.getCountries()
  }

  getCountries() {
    this.countrySrvc.get().subscribe(res => {
      console.log(res)
      this.countryList = res
      
    })
  }

  getCities() {
    this.citiesSrvc.get().subscribe(res => {
      console.log(res)
      let data
      data = res
      this.dataSource = new MatTableDataSource(data)
    })
  }

  save(data: NgForm) {
    console.log(data.form.value)
    let info
    info = data.form.value

    this.citiesSrvc.create(info).subscribe(async res => {
      if (res != undefined) {
        await this.getCities()
        this.show_cityList = true
        this.openSnackBar('New City added')
      } else {
        this.openSnackBar('City not added')
      }
    }), error => {
      // console.log(error)
    }
  }

  update(data: NgForm) {
    // console.log(data.form.value);
    let info
    info = data.form.value
    info.id = this.cityInfo.id

    this.citiesSrvc.update(info).subscribe(async res => {
      if (res != undefined) {
        await this.getCities()
        this.show_cityList = true
        this.cityInfo = {}
        this.openSnackBar('City updated')
      } else {
        this.openSnackBar('City not updated')
      }
    }), error => {
      // console.log(error)
    }
  }

  remove(data) {
    // console.log(data);
    this.citiesSrvc.delete(data).subscribe(async res => {
      await this.getCities()
      this.show_cityList = true
      this.openSnackBar('City removed')
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
