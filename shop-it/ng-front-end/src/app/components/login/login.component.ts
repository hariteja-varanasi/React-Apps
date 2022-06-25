import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class LoginComponent implements OnInit {

  registrationForm: FormGroup;
  loginForm: FormGroup;
  roles: any[] = ['user'];
  constructor(private formBuilder: FormBuilder, private loginService: LoginService) {
    this.registrationForm = this.formBuilder.group({
        name: ['', Validators.compose([Validators.required, Validators.minLength(5) ])],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        mobile: ['', Validators.compose([Validators.required, Validators.pattern("^((\\+91-?|0)?[6-9][0-9]{9}$)")])],
        role: ['', Validators.required]
      }
    );

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  submitted = false;
  loggedIn = false;

  ngOnInit(): void {
  }

  status: any = false;

  checkStatus() {
    this.status = !this.status;
  }

  authenticateUser(data: any){
    this.loginService.authenticateUser(data);
  }

  logoutUser(){
    return this.loginService.logout();
  }

  registerUser(data: any){
    this.submitted = true;
    let password = data.password;
    let confirmPassword = data.confirmPassword;

    if(this.registrationForm && password !== confirmPassword){
      this.registrationForm.controls['confirmPassword'].setErrors({mustMatch: true});
      console.log("form control errors: ", this.registrationForm.controls['confirmPassword'].errors);
      return;
    }
    if(this.registrationForm.invalid){
      console.log("inside form is invalid");
      console.log("registration form: ", this.registrationForm);
      return;
    }
    this.loginService.registerUser(data);
  }

}
