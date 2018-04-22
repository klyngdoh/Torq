import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CarService} from "../../services/cars.service";
import {Car} from "../../models/car.interface";
import {SearchParams} from "../../models/searchparams.interface";
import {AgmCoreModule, MapsAPILoader} from '@agm/core';

import {} from '@types/googlemaps';

@Component({
  selector: 'app-car-view',
  templateUrl: './car-view.component.html',
  styleUrls: ['./car-view.component.css']
})
export class CarViewComponent implements OnInit, AfterViewChecked {

  constructor(private activatedRoute: ActivatedRoute, private carService: CarService, private router: Router, private mapsAPILoader: MapsAPILoader) {
  }

  car: Car;
  carId: number;
  photos: string[];
  searchParams: SearchParams;
  geocoder: any;
  place: string;
  comments: any[];
  commentsNumber: number;

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
      this.comments = this.car.comments;
      this.commentsNumber = this.car.comments.length;
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
    ;
  }
}

declare var buildImgSlider;

