import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {CarService} from "../../services/cars.service";
import {UserService} from "../../services/user.service";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

import {} from '@types/googlemaps';


@Component({
  selector: 'app-car-new',
  templateUrl: './car-new.component.html',
  styleUrls: ['./car-new.component.css']
})


export class CarNewComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  constructor(private carService: CarService, private router: Router, private userService: UserService, private mapsAPILoader: MapsAPILoader,) {
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
  carUrl: string;
  filesToUpload: Array<File> = [];
  autocomplete: any;
  approved: string;


  ngOnInit() {
    var user = this.userService.getUser();
    this.carUrl = "/api/car/";
    updater();

    this.mapsAPILoader.load().then(() => {
      var input = <HTMLInputElement>document.getElementById('location');
      this.autocomplete = new google.maps.places.Autocomplete(input);
    });
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
    this.location = this.autocomplete.getPlace().geometry.location.lng() + "," + this.autocomplete.getPlace().geometry.location.lat();
    this.approved = "false";



    const _formData = new FormData();
    _formData.append("make", this.make);
    _formData.append("model", this.model);
    _formData.append("mileage", this.mileage.toString());
    _formData.append("year", this.year.toString());
    _formData.append("vin", this.vin.toString());
    _formData.append("_id", "");
    _formData.append("fuel", this.fuel);
    _formData.append("type", this.type);
    _formData.append("transmission", this.transmission);
    _formData.append("pricePerDay", this.price.toString());
    _formData.append("description", "");
    _formData.append("rating", "0");
    _formData.append("location", this.location);
    _formData.append("approved", this.approved);

    const files: Array<File> = this.filesToUpload;

    for(let i =0; i < files.length; i++){
      _formData.append("images[]", files[i], files[i]['name']);
    }



    this.carService.addCar(_formData).subscribe(data => {
      this.router.navigate(['/car/' + data._id]);
    }, error => {
      debugger;
    });


  }

  fileChange(files: any){
    this.filesToUpload = <Array<File>>files.target.files;
  }


}

declare var updater: any;

