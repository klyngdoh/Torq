import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Car} from "../models/car.interface";
import {FilterParams} from "../models/filterparams.interface";
import {SearchParams} from "../models/searchparams.interface";
import 'rxjs/add/operator/map';


// injecting service into module
@Injectable()
export class CarService {

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
    'getCarById': this.getCarById,
    'filterCars': this.filterCars,
    'bookCar': this.bookCar
  };

  addCar(car: FormData) {
    return this.http.post<Car>("/api/car/addCar", car);
  }


  deleteCar(carId: string) {

  }

  updateCar(carId: string, car: Car) {

  }

  approveCarAdmin(car: Car) {
    return this.http.post<Car>("/api/car/approveCar", car);
  }

  declineCarAdmin(car: Car) {
    return this.http.post<Car>("/api/car/declineCar", car);
  }

  getCars(search: SearchParams) {
    // Use searchParams to fetch cars from the server
    // if (this.searchParams == undefined) {
    //   return [];
    // } else {
    // }


    // Make HTTP request to fetch cars

    return this.http.post<Car[]>('/api/car/searchCar', search);
  }

  getUnapprovedCars() {
    return this.http.get<Car[]>('/api/car/unapprovedCars');
  }

  getCarById(carId) {
    return this.http.get<Car>('/api/car/'+carId);
  }

  filterCars(searchParams: SearchParams, filterParams: FilterParams) {

  }


  updateSearch(params: SearchParams) {
    this.searchParams = params;
    //return this.getCars();
  }

  bookCar(car:Car, startDate, endDate, location) {
    var body = car;
    body['startDate'] = startDate;
    body['endDate'] = endDate;
    body['pickupLocation'] = location;
    return this.http.post("/api/car/"+car._id+"/book", body);
  }

  addComment(commentOnId: string, comment: string, rating:number){

    var commentObject = {commentorId: "", commentorName: "", commentorPhoto: "", comment: comment, rating: rating};

    return this.http.post("/api/car/" + commentOnId + "/comment", commentObject);
  }

  getCarCount() {
    return this.http.get("/api/car/count");
  }
}
