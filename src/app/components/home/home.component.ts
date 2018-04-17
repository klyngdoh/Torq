import {Component, OnInit, ViewChild} from '@angular/core';
import {CarService} from "../../services/cars.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

import {} from '@types/googlemaps';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('f') searchForm: NgForm;

  location: string;
  pickupDate: string;
  returnDate: string;
  autocomplete: any;

  constructor(private carService: CarService,
              private router: Router, private mapsAPILoader: MapsAPILoader) {
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      var input = <HTMLInputElement>document.getElementById('formSearchUpLocation');
      this.autocomplete = new google.maps.places.Autocomplete(input);
    });
  }

  searchCars($event) {
    $event.preventDefault();
    this.location = this.autocomplete.getPlace().geometry.location.lng() + "," + this.autocomplete.getPlace().geometry.location.lat();
    this.pickupDate = (<HTMLInputElement>document.getElementById("pickupDate")).value;
    this.returnDate = (<HTMLInputElement>document.getElementById("returnDate")).value;
    this.router.navigate(['/car'], {queryParams: {location: this.location, pickupDate: this.pickupDate, returnDate: this.returnDate}});

  }
}
