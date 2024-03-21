import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aircraftdata } from  './Aircraftdata';
import { AircraftListdata } from  './Aircraftdata';
import { MaintainanceList } from  './Aircraftdata';
import { MaintainanceSched } from  './Aircraftdata';
import { Observable } from  'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = "https://www.1kbiz.com/backend";

  constructor(private httpClient: HttpClient) { }
  //Aircraft Type
  readAircraft(): Observable<Aircraftdata[]>{
    return this.httpClient.get<Aircraftdata[]>(`${this.PHP_API_SERVER}/api/read.php`);
  }

  createAircraft(aircraftdata: Aircraftdata): Observable<Aircraftdata>{
    return this.httpClient.post<Aircraftdata>(`${this.PHP_API_SERVER}/api/create.php`, aircraftdata);
  }

  updateAircraft(aircraftdata: Aircraftdata){
    return this.httpClient.put<Aircraftdata>(`${this.PHP_API_SERVER}/api/update.php`, aircraftdata);   
  }

  deleteAircraft(id: number){
    return this.httpClient.delete<Aircraftdata>(`${this.PHP_API_SERVER}/api/delete.php/?id=${id}`);
  }
  
  //Aircraft List
  readAircraftList(): Observable<AircraftListdata[]>{
    return this.httpClient.get<AircraftListdata[]>(`${this.PHP_API_SERVER}/api/listofAircraft.php`);
  }

  createAircraftList(aircraftLists: AircraftListdata): Observable<AircraftListdata>{
    return this.httpClient.post<AircraftListdata>(`${this.PHP_API_SERVER}/api/createAircraftList.php`, aircraftLists);
  }

  updateAircraftList(aircraftLists: AircraftListdata){
    return this.httpClient.put<AircraftListdata>(`${this.PHP_API_SERVER}/api/updateAircraftList.php`, aircraftLists);   
  }

  deleteAircraftList(id: number){
    return this.httpClient.delete<AircraftListdata>(`${this.PHP_API_SERVER}/api/deleteAircraftList.php/?id=${id}`);
  }
  //Maintenance List
  readMaintenanceList(): Observable<MaintainanceList[]>{
    return this.httpClient.get<MaintainanceList[]>(`${this.PHP_API_SERVER}/api/maintenanceList.php`);
  }

  createMaintenanceList(aircraftLists: MaintainanceList): Observable<MaintainanceList>{
    return this.httpClient.post<MaintainanceList>(`${this.PHP_API_SERVER}/api/createmaintenanceList.php`, aircraftLists);
  }

  updateMaintenanceList(aircraftLists: MaintainanceList){
    return this.httpClient.put<MaintainanceList>(`${this.PHP_API_SERVER}/api/updatemaintenanceList.php`, aircraftLists);   
  }

  deleteMaintenanceList(id: number){
    return this.httpClient.delete<MaintainanceList>(`${this.PHP_API_SERVER}/api/deletemaintenanceList.php/?id=${id}`);
  }

  readMainList(): Observable<MaintainanceSched[]>{
    return this.httpClient.get<MaintainanceSched[]>(`${this.PHP_API_SERVER}/api/readSchedMaintenance.php`);
  }

  




}


