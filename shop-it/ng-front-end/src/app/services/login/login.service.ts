import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../../classes/app-settings";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, private router:Router) { }

  //Register User
  registerUser(data: any){
    console.log("Register User data : ", data);
    this.http.post(AppSettings.URL + '/register', data).subscribe((res:any) => {
      console.log("Response Body: ", res);
      this.router.navigate(["/"]);
    }, (error:any) => {
      console.log(error.stack);
    });
  }

  //Authenticate User
  authenticateUser(data: any){
    console.log("data : ", data);
    this.http.post(AppSettings.URL + '/login', data).subscribe((res:any) => {
      console.log("Response Body: ", res);
      this.router.navigate(["/"]);
    }, (error:any) => {
      console.log(error.stack);
    });
  }

  //Logout User
  logout(){
    let loggedIn = true;
    this.http.get(AppSettings.URL + '/logout').subscribe((res:any) => {
      console.log("Response is: ", res);
      loggedIn = false;
      this.router.navigate(["/"]);
    }, (error:any) => {
      console.log(error.stack);
    });
    return loggedIn;
  }
}
