import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

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
    const url = this.url + '/api/maintenance/user/' + (id != undefined ? id : '');
    return this.http.get(url, this.getHeaders());
  }

  create(info) {
    let data = {
      "Username": info,
      "FirstName": info,
      "LastName": info,
      "Password": info,
    }
    const url = this.url + '/api/maintenance/user/create';
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
    const url = this.url + '/api/maintenance/user/' + info.id;
    return this.http.put(url, info, this.getHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(info) {
    const url = this.url + '/api/maintenance/user/' + info.id + '/delete';
    return this.http.delete(url, this.getHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

}
