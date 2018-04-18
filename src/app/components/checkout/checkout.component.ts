import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Car} from "../../models/car.interface";
import {MapsAPILoader} from "@agm/core";
import {CarService} from "../../services/cars.service";
import {SearchParams} from "../../models/searchparams.interface";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  constructor(private activatedRoute: ActivatedRoute, private carService: CarService, private router: Router, private mapsAPILoader: MapsAPILoader) {
  }

  car: Car;
  carId: number;
  photos: string[];
  searchParams: SearchParams;
  geocoder: any;
  place: string;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.carId = params['cid'];
    });

    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.searchParams = {
        location: params['location'],
        pickupDate: params['pickupDate'],
        returnDate: params['returnDate'],
        filterParams: undefined
      };
    });


    this.carService.getCarById(this.carId).subscribe(data => {
      this.car = data;
      this.photos = this.car.photos;
    }, error => {
      debugger;
    });

    this.mapsAPILoader.load().then(() => {
      var input = <HTMLInputElement>document.getElementById('location');
      this.geocoder = new google.maps.Geocoder;
      this.geocodeLatLng();
    });
  }


  ngAfterViewChecked() {
    buildImgSlider();

  }

  geocodeLatLng() {
    var that = this;
    var latlngStr = this.searchParams.location.split(',', 2);
    var latlng = {lng: parseFloat(latlngStr[0]), lat: parseFloat(latlngStr[1])};
    this.geocoder.geocode({'location': latlng}, function (results, status) {
      var temp = results[0].formatted_address.split(",");
      temp.splice(-2, 2);
      that.place = temp.join(",");
    });
  }

  checkout(id) {
    this.router.navigate(['/car/' + this.carId + '/checkout'], {
      queryParams: {
        location: this.searchParams.location,
        pickupDate: this.searchParams.pickupDate,
        returnDate: this.searchParams.returnDate
      }
    });
  }

  bookCar() {
    this.carService.bookCar(this.car, this.searchParams.pickupDate, this.searchParams.returnDate, this.searchParams.location).subscribe(data => {
      //Confirmation message?
    }, error => {
      debugger;
    });

  }

}
declare var buildImgSlider;
