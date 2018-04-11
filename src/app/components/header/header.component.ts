import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.interface";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) {
    this.userId = '0';
    this.userService.getLoggedInUser.subscribe(user => {
      this.user = user;
      if(this.user != null && this.user != undefined) {
        this.userId = user._id;
        this.firstName = user.firstName;
        this.userType = user.type;
      } else {
        this.userId = '0';
        this.userType = "";
      }
    });
  }

  userId: string;
  user: User;
  firstName: string;
  userType: string;

  ngOnInit() {
    this.user = this.userService.getUser();
    if(this.user != undefined) {
      this.userId = this.user._id;
    }
  }

  navigate($event, path: string) {
    $event.preventDefault();

    var newPath: string = path.replace(":uid", this.userId);

    this.router.navigate([newPath]);
  }

  logout($event, path:string) {
    this.userService.setUser(null);
    this.navigate($event, path);
  }
}
