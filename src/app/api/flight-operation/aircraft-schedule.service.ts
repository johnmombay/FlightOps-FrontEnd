import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AircraftScheduleService {

  url = environment.endpoint;

  constructor(
    private http: HttpClient,

  ) {
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      })
    };
  }

  getResource() {
    const url = this.url + '/api/flightOperations/Schedule-Resource/published';
    return this.http.get(url, this.getHeaders());
  }

  getAllEvents() {
    const url = this.url + '/api/flightOperations/AircraftSchedule/AllEvents';
    return this.http.post(url, {}, this.getHeaders());
  }

  getFlights() {
    const url = this.url + '/api/flightschedule/published';
    return this.http.get(url, this.getHeaders());
  }

  get(schedID, resourceID) {
    const url = this.url + '/api/flightOperations/AircraftSchedule/' + schedID + '/' + resourceID;
    return this.http.get(url, this.getHeaders());
  }
  
  assign(info) {
    const url = this.url + '/api/flightOperations/AircraftSchedule/Assign';
    return this.http.post(url, info, this.getHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }

  update(info) {
    const url = this.url + '/api/flightOperations/AircraftSchedule/Update';
    return this.http.put(url, info, this.getHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  actual(info) {
    const url = this.url + '/api/flightOperations/AircraftSchedule/Actual';
    return this.http.put(url, info, this.getHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }


}
