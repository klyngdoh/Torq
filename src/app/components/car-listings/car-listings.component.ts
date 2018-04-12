import {Component, OnInit} from '@angular/core';
import {FilterParams} from "../../models/filterparams.interface";
import {SearchParams} from '../../models/searchparams.interface';
import {Car} from '../../models/car.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {CarService} from '../../services/cars.service';

@Component({
  selector: 'app-car-listings',
  templateUrl: './car-listings.component.html',
  styleUrls: ['./car-listings.component.css']
})
export class CarListingsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private carService: CarService) {
  }

  cars: Car[];
  searchParams: SearchParams;
  filterParams: FilterParams;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.searchParams = {
        location: params['location'],
        pickupDate: params['pickupDate'],
        returnDate: params['returnDate']
      };
    });

    this.carService.getCars(this.searchParams.location, this.searchParams.pickupDate, this.searchParams.returnDate)
      .subscribe((result: Car[]) => {
        this.cars = result;
      });
  }

  filter($event) {
    $event.preventDefault();
    var price = getSliderValues();

    this.filterParams = {
      carType: getCheckedElements("carType"),
      fuelType: getCheckedElements("fuelType"),
      transmission: getCheckedElements("transmissionType"),
      priceLow: price[0],
      priceHigh: price[1]
    };
    debugger;
  }

}

declare var getCheckedElements;
declare var getSliderValues;
