import { Component, OnInit } from '@angular/core';
import {CarService} from "../../services/cars.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  location: string;
  pickupDate: string;
  returnDate: string;


  constructor(private carService: CarService,
              private router: Router) { }

  ngOnInit() {
  }

  searchCars(location: string, pickup: string, drop: string){
    this.carService.getCars(location, pickup, drop)
      .subscribe((cars: any) =>{
        if(cars){
          console.log(cars);
          this.router.navigate(['/car']);
        }
      });

  }

}
