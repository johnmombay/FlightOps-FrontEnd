import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AircraftTypeService {

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

  get(id?) {
    const url = this.url + '/api/aircraft/aircraft-type/' + (id != undefined ? id : '');
    return this.http.get(url, this.getHeaders());
  }

  create(info) {
    const url = this.url + '/api/aircraft/aircraft-type/create';
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
    const url = this.url + '/api/aircraft/aircraft-type/' + info.id;
    return this.http.put(url, info, this.getHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(info) {
    const url = this.url + '/api/aircraft/aircraft-type/' + info.id + '/delete';
    return this.http.delete(url, this.getHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }
}
