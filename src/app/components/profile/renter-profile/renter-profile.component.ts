import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-renter-profile',
  templateUrl: './renter-profile.component.html',
  styleUrls: ['./renter-profile.component.css']
})
export class RenterProfileComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  customerId: string;
  customerFirstName: string;
  customerLastName: string;
  customerName: string;
  photos: string[];
  comments: any[];
  commentsNumber: number;
  newComment: string;
  loggedInUser: any;
  rating:number;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
    this.customerId = params['uid'];
    this.userService.getUserById(this.customerId)
      .subscribe((user) => {
        this.customerFirstName = user.firstName;
        this.customerLastName = user.lastName;
        this.customerName = this.customerFirstName + ' ' + this.customerLastName;
        this.photos = user.photos;
        this.comments = user.comments;
        this.commentsNumber = user.comments.length;
        this.rating = user.rating;
        createRORating("#user-rating", this.rating);
      })

      this.loggedInUser = this.userService.getUser();
    });


  }

  submitComment(comment: string, rating:number){

    //console.log('Im in customer type submit component');
    this.userService.addComment(this.customerId, comment, rating)
      .subscribe((data)=>{
        console.log('object received after submit comment and being pushed into the submit array on client side :', data);
        this.comments.push(data);
        this.newComment = "";
        this.commentsNumber = this.commentsNumber + 1;
      });

  }

}

declare var createRORating;
