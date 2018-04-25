import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../models/user.interface";
import {GoogleSignInSuccess} from "angular-google-signin";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('f') loginForm: NgForm;

  constructor(private userService: UserService, private router: Router) {

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }

  ngOnInit() {

    var that = this;
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '184845472299453',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.12'
      });

      FB.AppEvents.logPageView();
      FB.Event.subscribe('auth.statusChange', (response => {
        if (response.status === 'connected') {
          var user = {};

          FB.api('/me',{fields: 'email, first_name, last_name'}, function(response) {
            user['email'] = response.email;
            user['firstName'] = response.first_name;
            user['lastName'] = response.last_name;
            user['username'] = user['password'] = user['_id'] = response.id;
            FB.api('/me/picture/',{redirect: false, type: "large"}, function(response) {
              user['photo'] = response.data.url;
              that.userService.fbLogin(user).subscribe(data => {
                var u: User = data;
                if(u == undefined) {
                  that.errorFlag = true;
                } else {
                  that.userService.setUser(u);
                  window.location = ('/user/' + u['_id']+'/profile');
                }
              }, error => {
                debugger;
              });
            });

          });
        }

      }));
    };
  }

  ngAfterViewInit() {
    if (window.FB) {

      window.FB.XFBML.parse();

    }
  }


  username:string;
  password:string;
  errorFlag:boolean;
  googleUser: any;


  login() {
    // fetching data from loginForm
    this.username  = this.loginForm.value.username;
    this.password  = this.loginForm.value.password;

    var user: User;
    this.errorFlag = false;
    this.userService.getUserByCredentials(this.username, this.password).subscribe(data => {

      user = data;
      if(user == undefined) {
        this.errorFlag = true;
      } else {
        this.userService.setUser(user);
        if(user.type == "admin") {
          this.router.navigate(['/user/' + user['_id']+'/dashboard']);
        } else {
          this.router.navigate(['/user/' + user['_id'] + '/profile']);
        }
      }
    }, error => {
      console.log(error);
      this.errorFlag = true;
    });
  }

  navigate(url) {
    this.router.navigate([url]);
  }


  clientId: string = '669731371211-0gbgdkal25jk0v50n90mgvhspgtqvu6e.apps.googleusercontent.com';

  onGoogleSignInSuccess(event: GoogleSignInSuccess) {
    if(this.googleUser == undefined) {
      let googleUser: gapi.auth2.GoogleUser = event.googleUser;
      let id: string = googleUser.getId();
      let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
      console.log('ID: ' +
        profile
          .getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());

      var user = {};
      user['username'] = user['_id'] = profile.getId();
      var names = profile.getName().split(" ");
      user['firstName'] = names[0];
      user['lastName'] = names[1];
      user['photo'] = profile.getImageUrl();
      user['email'] = profile.getEmail();
      this.googleUser = user;
    } else {

      this.userService.fbLogin(this.googleUser).subscribe(data => {
        this.googleUser = undefined;
        var u: User = data;
        if (u == undefined) {
          this.errorFlag = true;
        } else {
          this.userService.setUser(u);
          window.location = ('/user/' + u['_id'] + '/profile');
        }
      }, error => {
        this.googleUser = undefined;
        debugger;
      });
    }
  }

  failure($event) {
    debugger;
  }

}
declare var updater: any;
declare var window: any;
declare var FB: any;
