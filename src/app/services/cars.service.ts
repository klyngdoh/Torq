import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Car} from "../models/car.interface";
import {FilterParams} from "../models/filterparams.interface";
import {SearchParams} from "../models/searchparams.interface";


// injecting service into module
@Injectable()
export class CarsService {

  constructor(private http: HttpClient) {
  }

  cars: [{
    name: "VW POLO TRENDLINE 2.0 TDI",
    pricePerDay: 39,
    rating: 4.0,
    description: "Vivamus eget nibh. Etiam cursus leo vel metus. Nulla facilisi. Aenean nec eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia.",
    year: 2013,
    fuel: "Diesel",
    mileage: 25000
  }];

  searchParams: SearchParams;

  api = {
    'addCar': this.addCar,
    'deleteCar': this.deleteCar,
    'updateCar': this.updateCar,
    'getCars': this.getCars,
    'filterCars': this.filterCars
  };

  addCar(car: Car) {

  }

  deleteCar(carId: string) {

  }

  updateCar(carId: string, car: Car) {

  }

  getCars() {
    // Use searchParams to fetch cars from the server
    if (this.searchParams == undefined) {
      return [];
    } else {
      // Make HTTP request to fetch cars
    }
  }

  filterCars(searchParams: SearchParams, filterParams: FilterParams) {

  }


  updateSearch(params: SearchParams) {
    this.searchParams = params;
    return this.getCars();
  }
}
