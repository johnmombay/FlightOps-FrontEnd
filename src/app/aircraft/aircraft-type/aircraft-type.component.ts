import { Component, OnInit } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatTableDataSource } from '@angular/material';
import { AircraftTypeService } from 'src/app/api/aircraft/aircraft-type.service';
import { NgForm } from '@angular/forms';


export class AircraftElement {
  id: number;
  aircraftTypeName: string;
  make: string;
  NoOfAircraft: string;
}

@Component({
  selector: 'app-aircraft-type',
  templateUrl: './aircraft-type.component.html',
  styleUrls: ['./aircraft-type.component.scss']
})
export class AircraftTypeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'aircraftTypeName', 'make', 'NoOfAircraft', "actions"];
  dataSource: any;
  show_aircraftTypeList: boolean = true
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  aircrafttypeInfo: any = {}
  isUpdate: Boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private aircraftTypeSrvc: AircraftTypeService,
  ) {

  }

  ngOnInit() {
    this.show_aircraftTypeList = true;
    this.getAircrafttypes();
  }

  getAircrafttypes() {
    this.aircraftTypeSrvc.get().subscribe(res => {
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

    this.aircraftTypeSrvc.create(info).subscribe(async res => {
      if (res != undefined) {
        await this.getAircrafttypes()
        this.show_aircraftTypeList = true
        this.openSnackBar('New Aircraft Type added')
      } else {
        this.openSnackBar('Aircraft Type not added')
      }
    }), error => {
      // console.log(error)
    }
  }

  update(data: NgForm) {
    // console.log(data.form.value);
    let info
    info = data.form.value
    info.id = this.aircrafttypeInfo.id

    this.aircraftTypeSrvc.update(info).subscribe(async res => {
      if (res != undefined) {
        await this.getAircrafttypes()
        this.show_aircraftTypeList = true
        this.aircrafttypeInfo = {}
        this.openSnackBar('Aircraft Type updated')
      } else {
        this.openSnackBar('Aircraft Type not updated')
      }
    }), error => {
      // console.log(error)
    }
  }

  remove(data) {
    // console.log(data);
    this.aircraftTypeSrvc.delete(data).subscribe(async res => {
      await this.getAircrafttypes()
      this.show_aircraftTypeList = true
      this.openSnackBar('Aircraft Type removed')
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
