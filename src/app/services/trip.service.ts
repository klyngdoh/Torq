import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Car} from "../models/car.interface";
import {FilterParams} from "../models/filterparams.interface";
import {SearchParams} from "../models/searchparams.interface";
import 'rxjs/add/operator/map';


// injecting service into module
@Injectable()
export class TripService {

  constructor(private http: HttpClient) {
  }


  api = {
    'getPendingApprovals': this.getPendingApprovals,
    'deleteCar': this.deleteCar,
    'updateCar': this.updateCar,
    'getCars': this.getCars,
    'getCarById': this.getCarById,
    'filterCars': this.filterCars,
    'bookCar': this.bookCar
  };

  getPendingApprovals() {
    return this.http.get<Car[]>("/api/trip/pendingApprovals");
  }


  deleteCar(carId: string) {

  }

  updateCar(carId: string, car: Car) {

  }

  getCars(search: SearchParams) {
    // Use searchParams to fetch cars from the server
    // if (this.searchParams == undefined) {
    //   return [];
    // } else {
    //}


    // Make HTTP request to fetch cars

    return this.http.post<Car[]>('/api/car/searchCar', search);
  }

  getCarById(carId) {
    return this.http.get<Car>('/api/car/'+carId);
  }

  filterCars(searchParams: SearchParams, filterParams: FilterParams) {

  }


  updateSearch(params: SearchParams) {

    //return this.getCars();
  }

  bookCar(car:Car, startDate, endDate, location) {
    var body = car;
    body['startDate'] = startDate;
    body['endDate'] = endDate;
    body['pickupLocation'] = location;
    return this.http.post("/api/car/"+car._id+"/book", body);
  }

}
