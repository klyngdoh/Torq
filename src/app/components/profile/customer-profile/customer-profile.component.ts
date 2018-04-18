import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.interface";

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  customerId: string;
  customerFirstName: string;
  customerLastName: string;
  customerName: string;
  photos: string[];
  //user1: User;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.customerId = params['uid'];
      this.userService.getUserById(this.customerId)
        .subscribe((user) => {
          this.customerFirstName = user.firstName;
          this.customerLastName = user.lastName;
          this.customerName = this.customerFirstName + ' ' + this.customerLastName;
          //this.user1 = user;
          this.photos = user.photos;
        })
    });



  }

}
