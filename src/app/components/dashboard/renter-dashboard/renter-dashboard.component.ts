import {Component, OnInit} from '@angular/core';
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

  constructor(private activatedRoute: ActivatedRoute, private tripService: TripService, private router: Router) {
  }

  cars: any[];
  trips: any[] = [];
  upcomingTrips: any[] = [];
  pastTrips: any[] = [];
  renterId: string;

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: any) => {
      this.renterId = params['uid'];
    });


    this.tripService.getPendingApprovals().subscribe(data => {
      this.cars = data;
      for (var car of this.cars) {
        var temp = car.trips.map(trip => {
          if (trip.status == "New" && trip.renter._id == this.renterId) {
            trip.href = "#" + trip._id;
            trip.car = {_id: car._id, name: car.make + " " + car.model};
            trip.startDate = new Date(trip.startDate);
            trip.endDate = new Date(trip.endDate);
            return trip;
          }
        });
        for(var t of temp) {
          if(t != undefined) {
            this.trips.push(t);
          }
        }
      }
    });

    this.tripService.getTrips().subscribe((data: Car[]) => {
      var tripCars = data;
      const today = new Date();
      for(var car of tripCars) {
        for(var trip of car.trips) {
          if (trip.renter._id === this.renterId) {
            debugger;
            trip.href = "#" + trip._id;
            trip.car = {_id: car._id, name: car.make + " " + car.model, photo: car.photos[0]};
            trip.startDate = new Date(trip.startDate);
            trip.endDate = new Date(trip.endDate);
            if(trip.startDate < today && trip.endDate < today) {
              this.pastTrips.push(trip);
            } else if (trip.startDate > today ){
              this.upcomingTrips.push(trip);
            }
          }
        }
      }
    });
  }

  customerProfile(customerId) {
    this.router.navigate(['/user/' + customerId + '/profile']);
  }

  changeTripStatus(tripId, status) {
    this.tripService.changeTripStatus(tripId, status).subscribe(data => {
      //Remove this trip from the pending approvals list
      this.trips = this.trips.filter(trip => {
        return trip._id != tripId;
      });
    }, error => {
      debugger;
    });
  }

  carView(carId) {
    this.router.navigate(['/car/' + carId]);
  }

}
