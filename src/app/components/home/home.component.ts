import {Component, OnInit, ViewChild} from '@angular/core';
import {CarService} from "../../services/cars.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

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

  constructor(private carService: CarService,
              private router: Router) {
  }

  ngOnInit() {
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBanZIbd_W68mQK--XRGvtdo64R46hBm6U&libraries=places&callback=init';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'g-maps'));
  }

  searchCars($event) {
    $event.preventDefault();
    this.location = autocomplete.getPlace().geometry.location.lng() + "," + autocomplete.getPlace().geometry.location.lat();
    this.pickupDate = (<HTMLInputElement>document.getElementById("pickupDate")).value;
    this.returnDate = (<HTMLInputElement>document.getElementById("returnDate")).value;
    this.carService.getCars(this.location, this.pickupDate, this.returnDate)
      .subscribe((cars: any) => {
        if (cars) {
          console.log(cars);
          debugger;
          this.router.navigate(['/car'], {queryParams: {location: this.location, pickupDate: this.pickupDate, returnDate: this.returnDate}});
        }
      });

  }
}

declare var autocomplete: any;
