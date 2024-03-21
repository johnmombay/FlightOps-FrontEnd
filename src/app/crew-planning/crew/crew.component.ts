import { Component, OnInit } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatTableDataSource } from '@angular/material';
import { NgForm } from '@angular/forms';
import { CrewService } from 'src/app/api/crew-planning/crew.service';
import { CrewPositionService } from 'src/app/api/crew-planning/crew-position.service';
export interface CrewElement {
  id: number;
  airportName: string;
  icaoCode: string;
  iataCode: string;
  cityId: string;
  address: string;
  category: string;

}
@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss']
})
export class CrewComponent implements OnInit {

  show_crewList = true;
  isUpdate: Boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  displayedColumns: string[] = ['id', 'LastName', 'FirstName', 'MiddleName', 'Position', 'actions'];

  crewData:any = [];
  PositionList: any = [];
  datasource: any = [];

  selectedData: any = null;

  constructor(
    private _snackBar: MatSnackBar,
    public positionSvc: CrewPositionService,
    public crewSvc: CrewService
     
  ) { }

  async ngOnInit() {
    this.show_crewList = true;

    await this.getPositionList();
    await this.getList();
  }

  getPositionList(){
    this.positionSvc.get().subscribe(res => {
      console.log(res)
      this.PositionList = res;
    })
  }
  getList(){
    this.crewSvc.get().subscribe(res => {
      console.log(res)
      let data
      data = res
      this.datasource = new MatTableDataSource(data)
    })
  }

  select(data){
    this.selectedData = data;
    this.show_crewList = false;
    console.log('select');
    console.log(this.selectedData);
  }

  save(form){
  console.log(form);
  if(form.status === 'VALID')
  {
    let data = form.value;

    if(this.selectedData === null)
    {
    this.crewSvc.create(data).subscribe(async res => {
      if (res != undefined) {
        await this.getList()
        this.show_crewList = true
        this.openSnackBar('New Crew added.')
      } else {
        this.openSnackBar('Error while saving. Please check your input and try again.')
      }
    }), error => {
      // console.log(error)
      this.openSnackBar('Error while saving.')
    }
  }
    else
    {
      
    data.id = this.selectedData.id;

    this.crewSvc.update(data).subscribe(async res => {
        await this.getList()
        this.show_crewList = true
        this.openSnackBar('Crew updated.')
      
    }), error => {
      // console.log(error)
      this.openSnackBar('Error while saving.')
    }
    
  }
  }
  else{
    this.openSnackBar('Submission is not valid. Please check your input.')
  }
  
  }

  export(data){
    this._snackBar.open("Data exported.", 'Close', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openSnackBar(msg) {
    this._snackBar.open(msg, 'Close', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  remove(data){

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

}
