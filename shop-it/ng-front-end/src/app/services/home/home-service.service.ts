import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppSettings} from "../../classes/app-settings";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  //Get Products
  getProducts() {
    return this.http.get(`${AppSettings.URL}/products`);
  }
}
