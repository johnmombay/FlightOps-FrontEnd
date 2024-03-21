import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  url = environment.endpoint;

  constructor(
    private http: HttpClient,
  ) { }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

  login() {
    let data = {
      "Username": "user",
      "Password": "1234"
    }
    const url = this.url + '/api/maintenance/Authenticate';
    this.http.post(url, data, this.getHeaders()).subscribe(res => {
      localStorage.setItem('authToken', res['token']);
      console.log(res)
    });
  }
}

