import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Car} from "../models/car.interface";
import {FilterParams} from "../models/filterparams.interface";
import {SearchParams} from "../models/searchparams.interface";


// injecting service into module
@Injectable()
export class TripService {

  constructor(private http: HttpClient) {
  }


  api = {
    'getPendingApprovals': this.getPendingApprovals,
    'changeTripStatus': this.changeTripStatus,
    'getTrips': this.getTrips
  };

  getPendingApprovals() {
    return this.http.get<Car[]>("/api/trip/pendingApprovals");
  }

  changeTripStatus(tripId, status) {
    return this.http.post("/api/trip/"+tripId+"/changeStatus", {status: status});
  }

  getTrips() {
    return this.http.get<Car[]>("/api/trip/trips");
  }

}
