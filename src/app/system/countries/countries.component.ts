import { Component, OnInit } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatTableDataSource } from '@angular/material';
import { CountriesService } from 'src/app/api/system/countries.service';
import { NgForm } from '@angular/forms';

export interface PeriodicElement {
  id: number;
  countryCode: string;
  countryName: string;
  region: string;
}

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'countryCode', 'countryName', 'region', 'actions'];
  dataSource: any;
  show_countryList: boolean = true
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  countryInfo: any = {}
  isUpdate: Boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    public countrySrvc: CountriesService,

  ) {

  }

  ngOnInit() {
    this.show_countryList = true;
    this.getCountries()
  }

  getCountries() {
    this.countrySrvc.get().subscribe(res => {
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

    this.countrySrvc.create(info).subscribe(async res => {
      if (res != undefined) {
        await this.getCountries()
        this.show_countryList = true
        this.openSnackBar('New Country added')
      } else {
        this.openSnackBar('Country not added')
      }
    }), error => {
      // console.log(error)
    }
  }

  update(data: NgForm) {
    // console.log(data.form.value);
    let info
    info = data.form.value
    info.id = this.countryInfo.id

    this.countrySrvc.update(info).subscribe(async res => {
      if (res != undefined) {
        await this.getCountries()
        this.show_countryList = true
        this.countryInfo = {}
        this.openSnackBar('Country updated')
      } else {
        this.openSnackBar('Country not updated')
      }
    }), error => {
      // console.log(error)
    }
  }

  remove(data) {
    // console.log(data);
    this.countrySrvc.delete(data).subscribe(async res => {
      await this.getCountries()
      this.show_countryList = true
      this.openSnackBar('Country removed')
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
