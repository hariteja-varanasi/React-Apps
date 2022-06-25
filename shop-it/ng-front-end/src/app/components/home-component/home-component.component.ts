import { Component, OnInit } from '@angular/core';
import { HomeService } from "../../services/home/home-service.service";

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  products:any[]=[];

  ngOnInit(): void {
    this.homeService.getProducts().subscribe((res:any) => {
      console.log("Products : ", res);
      this.products = res.products;
    }, (error:any) => {
      console.log(error.stack);
    })
  }

}
