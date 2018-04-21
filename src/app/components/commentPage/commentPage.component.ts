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
  carId: string;
  name: string;  // name = firstName+LastName for customer type || name = year + make + model for car type
  comment :string;

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: any) => {

      this.type = params['type'];

      if(this.type == 'customer'){
        this.customerId = params['id'];
        this.userService.getUserById(this.customerId)
          .subscribe((user) => {
            this.name = user.firstName + ' ' + user.lastName;
          });
      }

      else{
        this.carId = params['id'];
        this.carService.getCarById(this.carId)
          .subscribe((car) => {
            this.name = car.year + ' ' + car.make + ' ' + car.model;
          });
      }


    });

  }


  submitComment(comment: string){
    if(this.type = 'customer'){
      this.userService.addComment(this.customerId, comment)
        .subscribe((comment)=>{
          //navigate to some page
        });
    }
    else{
      // car service add comment
    }
  }

}
