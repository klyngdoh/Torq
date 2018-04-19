import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {CarService} from "../../services/cars.service";


@Component({
  selector: 'app-commentPage',
  templateUrl: './commentPage.component.html',
  styleUrls: ['./commentPage.component.css']
})
export class CommentComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private carService: CarService) { }

  type: string;
  customerId: string;
  FirstName: string;
  LastName: string;
  name: string;  // name = firstName+LastName for customer type || name = year + make + model for car type
  carId: string;
  // carYear: string;
  // carMake: string;
  // carModel: string;

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: any) => {

      this.type = params['type'];

      if(this.type == 'customer'){
        this.customerId = params['id'];
        this.userService.getUserById(this.customerId)
          .subscribe((user) => {
            this.FirstName = user.firstName;
            this.LastName = user.lastName;
            this.name = this.FirstName + ' ' + this.LastName;
          })
      }

      else{
        this.carId = params['id'];
        this.carService.getCarById(this.carId)
          .subscribe((car) => {
            this.name = car.year + ' ' + car.make + ' ' + car.model;
          })
      }


    });

  }

}
