import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {LoginService} from "./services/login/login.service";
import {LoginComponent} from "./components/login/login.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private loginComponent: LoginComponent){
  }

  title = 'ng-front-end';
  faCoffee = faCoffee;
  loginIndicator = false;

  logout(){
    console.log("login indicator: ", this.loginIndicator);
  }
}
