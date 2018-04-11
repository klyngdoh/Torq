import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {CarService} from "../../services/cars.service";
import {Car} from "../../models/car.interface";

@Component({
  selector: 'app-car-new',
  templateUrl: './car-new.component.html',
  styleUrls: ['./car-new.component.css']
})
export class CarNewComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  constructor(private carService: CarService, private router: Router) {
  }

  make: string;
  model: string;
  mileage: number;
  year: number;
  vin: number;
  type: string;
  fuel: string;
  description: string;
  transmission: string;
  price: number;
  location: string;

  ngOnInit() {

  }

  addCar($event) {
    $event.preventDefault();
    this.make = this.loginForm.value.make;
    this.model = this.loginForm.value.model;
    this.mileage = this.loginForm.value.mileage;
    this.year = this.loginForm.value.year;
    this.vin = this.loginForm.value.vin;
    this.transmission = (<HTMLSelectElement>document.getElementById("transmission")).value;
    this.fuel = (<HTMLSelectElement>document.getElementById("fuel")).value;
    this.type = (<HTMLSelectElement>document.getElementById("type")).value;
    this.price = this.loginForm.value.price;
    this.location = this.loginForm.value.location;
    debugger;

    var car: Car = {
      make: this.make,
      model: this.model,
      mileage: this.mileage,
      year: this.year,
      vin: this.vin,
      _id: "",
      fuel: this.fuel,
      type: this.type,
      transmission: this.transmission,
      pricePerDay: this.price,
      description: "",
      images: [],
      rating: 0,
      location: this.location
    };

    this.carService.addCar(car).subscribe(data => {
      this.router.navigate(['/car/'+data._id]);
    }, error => {
      debugger;
    })


  }

}
