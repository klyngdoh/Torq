import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CarService} from "../../services/cars.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AgmCoreModule, MapsAPILoader} from '@agm/core';
import {UserService} from '../../services/user.service';
import {SupportService} from '../../services/support.service';

import {} from '@types/googlemaps';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('f') searchForm: NgForm;

  location: string;
  pickupDate: string;
  returnDate: string;
  autocomplete: any;
  users: string;
  cars: string;
  miles: string;
  messages: string;


  constructor(private carService: CarService,
              private router: Router,
              private mapsAPILoader: MapsAPILoader,
              private userService: UserService,
              private supportService: SupportService) {
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      var input = <HTMLInputElement>document.getElementById('formSearchUpLocation');
      this.autocomplete = new google.maps.places.Autocomplete(input);
    });
    this.userService.getUserCount().subscribe((users: string) => {
      this.users = users;
    });
    this.carService.getCarCount().subscribe((cars: string) => {
      this.cars = cars;
    });
    this.supportService.getReadCount().subscribe((messages: string) => {
      this.messages = messages;
    });
    //   this.carService.getMileCount().subscribe(miles => {
    //     this.miles = miles;

    //   });
  }

  ngAfterViewInit() {
    linkDatePickers();
  }

  searchCars($event) {
    $event.preventDefault();

    this.location = this.autocomplete.getPlace().geometry.location.lng() + "," + this.autocomplete.getPlace().geometry.location.lat();
    this.pickupDate = (<HTMLInputElement>document.getElementById("pickupDate")).value;
    this.returnDate = (<HTMLInputElement>document.getElementById("returnDate")).value;
    if(this.location == undefined || this.pickupDate == undefined || this.returnDate == undefined) {
      return;
    }
    this.router.navigate(['/car'], {
      queryParams: {
        location: this.location,
        pickupDate: this.pickupDate,
        returnDate: this.returnDate
      }
    });

  }
}

declare var linkDatePickers;
