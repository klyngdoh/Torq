import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TripService} from "../../../services/trip.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private tripService: TripService, private router: Router) { }

  cars: any[];
  trips: any[] = [];
  customerId: string;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.customerId = params['uid'];
    });

    this.tripService.getPendingApprovals().subscribe(data => {
      this.cars = data;
      for (var car of this.cars) {
        var temp = car.trips.map(trip => {
          if (trip.status == "New" && trip.customer._id == this.customerId) {
            trip.href = "#" + trip._id;
            trip.car = {_id: car._id, name: car.make + " " + car.model};
            trip.startDate = new Date(trip.startDate);
            trip.endDate = new Date(trip.endDate);
            return trip;
          }
        });
        if(temp[0] != undefined) {
          Array.prototype.push.apply(this.trips, temp);
        }
        debugger;
      }
    });
  }
  renterProfile(renterId) {
    this.router.navigate(['/user/' + renterId + '/profile']);
  }

  changeTripStatus(tripId, status) {
    this.tripService.changeTripStatus(tripId, status).subscribe(data => {
      //Remove this trip from the pending approvals list
      this.trips = this.trips.filter(trip => {
        return trip._id != trip.id;
      });
    }, error => {
      debugger;
    });
  }

  carView(carId) {
    this.router.navigate(['/car/' + carId]);
  }

}
