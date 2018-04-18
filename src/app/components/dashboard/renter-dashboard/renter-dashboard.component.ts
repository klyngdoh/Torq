import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CarService} from "../../../services/cars.service";
import {TripService} from "../../../services/trip.service";
import {Car} from "../../../models/car.interface";

@Component({
  selector: 'app-renter-dashboard',
  templateUrl: './renter-dashboard.component.html',
  styleUrls: ['./renter-dashboard.component.css']
})
export class RenterDashboardComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private carService: CarService, private tripService: TripService, private router: Router) { }

  cars: any[];
  trips: any[];

  ngOnInit() {
    this.tripService.getPendingApprovals().subscribe(data => {
      this.cars = data;
      for(var car of this.cars) {
        var temp = car.trips.map(trip => {
          if(trip.status == "New") {
              trip.href = "#" + trip._id;
            return trip;
          }
        });
        Array.prototype.push.apply(this.trips, temp);
      }
      debugger;
    });
  }

}
