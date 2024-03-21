import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MaintainanceList } from 'src/app//Aircraftdata';
import { ApiService } from 'src/app/api.service';
import { Aircraftdata } from 'src/app//Aircraftdata';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';


export class maintenanceElement { // maintenanceElement properties
  id: number;
  maintenanceCode: string;
  maintenanceName: String;
  durationHours: number;
  aircraftType: number;
}

export class AircraftElement {
  ids: number;
  aircraftTypeName: string;
  make: string;
  NoOfAircraft: string;
}

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

 aircraftTypeData: any;
 aircraftList:  MaintainanceList[];
 selectedMaintainanceList:  MaintainanceList  = {
  id: null,
  maintenanceCode: null,
  maintenanceName: null,
  durationHours: null,
  aircraftType : null
 };

 maintenance_displayedColumns: string[] = [
   'id',
   'maintenanceCode',
   'maintenanceName',
   'durationHours',
   "aircraftType",
   "actions"
 ];

 maintenance_dataSource: MatTableDataSource<maintenanceElement[]>;
 show_maintenanceList: boolean = true

  constructor(private apiService: ApiService) {


  }

  ngOnInit() {
    this.readMaintenanceData();
    this.apiService.readAircraft().subscribe((aircrafttype: Aircraftdata[]) => {
      console.log(aircrafttype)
      this.aircraftTypeData = aircrafttype;
    })
  }

  nullData() {
    this.selectedMaintainanceList.id = null
    this.selectedMaintainanceList.maintenanceCode = null
    this.selectedMaintainanceList.maintenanceName = null
    this.selectedMaintainanceList.durationHours = null
    this.selectedMaintainanceList.aircraftType = null
  }

  aircraftSelected(value) {
    console.log(value)
  }

  readMaintenanceData() {
    this.apiService.readMaintenanceList().subscribe((maintainanceList: MaintainanceList[]) => {
      const rows = [];
      maintainanceList.forEach(element => rows.push(element));
      this.maintenance_dataSource = new MatTableDataSource(rows);

    })
  }

  createOrUpdateAircraftList(form) {
    if (this.selectedMaintainanceList.id != null) {
      form.value.id = this.selectedMaintainanceList.id;
      this.apiService.updateMaintenanceList(form.value).subscribe((maintainanceList: MaintainanceList) => {
        console.log("Aircraft updated", maintainanceList);
        this.readMaintenanceData();
      });
    }
    else {
      this.apiService.createMaintenanceList(form.value).subscribe((maintainanceList: MaintainanceList) => {
        console.log("Maintenance Added", maintainanceList);
        this.readMaintenanceData();
      });
    }
  }

  selectMaintenance(maintainanceList: MaintainanceList) {
    this.selectedMaintainanceList = maintainanceList;
  }

  deleteMaintenance(id) {
    this.apiService.deleteMaintenanceList(id).subscribe((maintainanceList: MaintainanceList) => {
      console.log("Aircraft deleted, ", maintainanceList);
      this.readMaintenanceData();
    });
  }




}
