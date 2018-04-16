import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CarService} from "../../services/cars.service";
import {Car} from "../../models/car.interface";
import {SearchParams} from "../../models/searchparams.interface";

@Component({
  selector: 'app-car-view',
  templateUrl: './car-view.component.html',
  styleUrls: ['./car-view.component.css']
})
export class CarViewComponent implements OnInit, AfterViewChecked {

  constructor(private activatedRoute: ActivatedRoute, private carService: CarService, private router: Router) { }

  car: Car;
  carId: number;
  photos: string[];
  searchParams: SearchParams;

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
  }


  ngAfterViewChecked() {
    buildImgSlider();

  }

}
declare var buildImgSlider;

