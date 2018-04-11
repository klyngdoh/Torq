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
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12&appId=184845472299453';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
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
