import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.interface";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  user:User;
  userType: string;
  userId: string;
  ngOnInit() {

    this.user = this.userService.getUser();

    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        }
      );

    if (this.user == undefined) {
      this.userService.getUserById(this.userId).subscribe(data => {
        this.user = data;
        this.userType = this.user['type'];
        this.userService.setUser(this.user);
      }, error => {
        debugger;
      });
    } else {
      this.userType = this.user['type'];
    }
  }
}
