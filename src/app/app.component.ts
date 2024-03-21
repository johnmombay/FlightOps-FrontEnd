import { Component } from '@angular/core';
import { AuthenticateService } from './api/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clientapp';


  constructor(
    public authSrvc: AuthenticateService,

  ) {
    this.initializeApp()
  }

  initializeApp() {
    this.authSrvc.login(); //get token
  }
}



