import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrewService {

  url = environment.endpoint + "/api/crew";
  
  constructor(
    private http: HttpClient,

  ) {
  }

  getHeaders() {
    const token = 'Bearer ' + localStorage.getItem('authToken');
    console.log(token);
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
  }

  get(id?) {
    const url = this.url + "/" + (id != undefined ? id : '');
    return this.http.get(url, this.getHeaders());
  }

  getByPositionId(id) {
    const url = this.url + "/api/crew/by-position/" + id;
    return this.http.get(url, this.getHeaders());
  }

  create(payload) {
    const url = this.url;
    console.log(' create payload');
    console.log(payload);
    return this.http.post(url, payload, this.getHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }

  update(payload) {
    const url = this.url;
    return this.http.put(url, payload, this.getHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(payload) {
    const url = this.url +"/" + payload.id;
    return this.http.delete(url, this.getHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }
}
