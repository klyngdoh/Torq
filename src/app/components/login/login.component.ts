import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../models/user.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }


  username:string;
  password:string;
  errorFlag:boolean;


  login() {
    // fetching data from loginForm
    this.username  = this.loginForm.value.username;
    this.password  = this.loginForm.value.password;

    var user: User;
    this.userService.getUserByCredentials(this.username, this.password).subscribe(data => {
      debugger;
      user = data;
      if(user == undefined) {
        this.errorFlag = true;
      } else {
        this.userService.setUser(user);
        this.router.navigate (['/user/' + user['_id']+'/profile']);
      }
    }, error => {
      console.log(error);
      this.errorFlag = true;
    });


  }

}
