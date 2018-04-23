import { Component, OnInit } from '@angular/core';
import {SupportService} from '../../../services/support.service';
import {Support} from '../../../models/support.interface';
import {CarService} from '../../../services/cars.service';
import {Car} from '../../../models/car.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user.interface';
import {UserService} from '../../../services/user.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private supportService: SupportService,
              private carService: CarService,
              private userService: UserService,
              private router: Router) { }

  unreadMessages: Support[];
  readMessages: Support[];
  cars: Car[];
  user: User;
  userId: string;

  ngOnInit() {

    this.user = this.userService.getUser();
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        }
      );

    this.supportService.getUnreadMessages().subscribe((result: Support[]) => {
      this.unreadMessages = result;
      for(let i = 0; i < this.unreadMessages.length; i++) {
        this.unreadMessages[i].mailLink = "mailto:" + this.unreadMessages[i].email + "?Subject=Hello%20from%20Torq!";
      }
    });

    this.supportService.getReadMessages().subscribe((result: Support[]) => {
      this.readMessages = result;
      for(let i = 0; i < this.readMessages.length; i++) {
        this.readMessages[i].mailLink = "mailto:" + this.readMessages[i].email + "?Subject=Hello%20from%20Torq!";
      }
    });
    this.carService.getUnapprovedCars().subscribe((result: Car[]) => {
      this.cars = result;
    });
  }

  dismiss($event, message:Support) {
    $event.preventDefault();

    this.supportService.viewMessage(message).subscribe((result: Support) => {

    });
    this.supportService.getUnreadMessages().subscribe((result: Support[]) => {
      this.unreadMessages = result;
      for(let i = 0; i < this.unreadMessages.length; i++) {
        this.unreadMessages[i].mailLink = "mailto:" + this.unreadMessages[i].email + "?Subject=Hello%20from%20Torq!";
      }
    });
    this.supportService.getReadMessages().subscribe((result: Support[]) => {
      this.readMessages = result;
      for(let i = 0; i < this.readMessages.length; i++) {
        this.readMessages[i].mailLink = "mailto:" + this.readMessages[i].email + "?Subject=Hello%20from%20Torq!";
      }
    });
  }

  toCarView($event, id: string) {
    $event.preventDefault();
    this.router.navigate(['car/' + id]);
  }

  approve($event, car: Car) {
    $event.preventDefault();
    this.carService.approveCarAdmin(car).subscribe((result: Car) => {
      this.carService.getUnapprovedCars().subscribe((result: Car[]) => {
        this.cars = result;
      });
    });
  }

  decline($event, car: Car) {
    $event.preventDefault();
    this.carService.declineCarAdmin(car).subscribe((result: Car) => {
      this.carService.getUnapprovedCars().subscribe((result: Car[]) => {
        this.cars = result;
      });
    });

  }
}
