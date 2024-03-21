import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublishScheduleService {

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

  publish(info) {
    const url = this.url + '/api/commercialPlanning/Publish';
    return this.http.put(url, info, this.getHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  unpublish(info) {
    const url = this.url + '/api/commercialPlanning/Unpublish';
    return this.http.put(url, info, this.getHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }

}
