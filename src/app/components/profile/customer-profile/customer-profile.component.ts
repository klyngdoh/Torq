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

  userId: string;
  user: User;

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        }
      );

    this.user = this.userService.getUser();

    /*this.userService.getUserById(this.userId).subscribe(data => {
      this.user = data;
    }, error => {
      debugger;
    });*/


  }

}
