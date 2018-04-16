import {AfterViewInit, Component, OnInit} from '@angular/core';
import {User} from "../../models/user.interface";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {

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

  ngAfterViewInit() {
    addRateYo(4.6);
  }
}
declare var addRateYo;
