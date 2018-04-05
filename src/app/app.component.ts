import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "./services/user.service";
import {User} from "./models/user.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  userId: string;
  user: User;

  ngOnInit() {
    this.user = this.userService.getUser();
    if(this.user != undefined) {
      this.userId = this.user._id;
    }
  }
}
