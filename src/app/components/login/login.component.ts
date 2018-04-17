import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../models/user.interface";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('f') loginForm: NgForm;

  constructor(private userService: UserService, private router: Router) {

    window.fbAsyncInit = function() {
      debugger;
      FB.init({
        appId      : '184845472299453',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.12'
      });

      FB.AppEvents.logPageView();
      FB.Event.subscribe('auth.statusChange', (response => {
        debugger;
        if (response.status === 'connected') {
          var user = {};
          FB.api('/me',{fields: 'email, first_name, last_name'}, function(response) {
            user['email'] = response.email;
            user['firstName'] = response.firstName;
            user['lastName'] = response.lastName;
          });
          FB.api('/10214896805749232/picture/',{redirect: false, type: "large"}, function(response) {
            user['photo'] = response.data.url;
          });

          this.userService.fbLogin(user).subscribe(data => {
            user = data;
            if(user == undefined) {
              this.errorFlag = true;
            } else {
              this.userService.setUser(user);
              this.router.navigate (['/user/' + user['_id']+'/profile']);
            }
          }, error => {
            debugger;
          })

        }

      }));
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (window.FB) {
      debugger;
      window.FB.XFBML.parse();

    }
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
declare var updater: any;
declare var window: any;
declare var FB: any;
