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

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
    this.customerId = params['uid'];
    this.userService.getUserById(this.customerId)
      .subscribe((user) => {
        this.customerFirstName = user.firstName;
        this.customerLastName = user.lastName;
        this.customerName = this.customerFirstName + ' ' + this.customerLastName;
        this.photos = user.photos;
      })
    });


  }

}
