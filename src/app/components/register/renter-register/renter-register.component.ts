import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.interface";

@Component({
  selector: 'app-renter-register',
  templateUrl: './renter-register.component.html',
  styleUrls: ['./renter-register.component.css']
})
export class RenterRegisterComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  verify: string;
  dob: string;
  errorFlag: boolean;

  login() {
    var user: User;
    this.userService.getUserByCredentials(this.username, this.password).subscribe(data => {
      debugger;
      user = data;
      if (user == undefined) {
        this.errorFlag = true;
      } else {
        this.userService.setUser(user);
        this.router.navigate(['/user/' + user['_id'] + '/profile']);
      }
    }, error => {
      console.log(error);
      this.errorFlag = true;
    });
  }

  register($event) {

    // uncomment once customer register works!!!!!
    //then change it as per image upload needs :

    // $event.preventDefault();
    // // fetching data from loginForm
    // this.username = this.loginForm.value.username;
    // this.password = this.loginForm.value.password;
    // this.email = this.loginForm.value.email;
    // this.firstname = this.loginForm.value.firstname;
    // this.lastname = this.loginForm.value.lastname;
    // this.dob = this.loginForm.value.dob;
    //
    // var user: User = {
    //   _id: "",
    //   type: "",
    //   username: this.username,
    //   password: this.password,
    //   email: this.email,
    //   firstName: this.firstname,
    //   lastName: this.lastname,
    //   dob: this.dob,
    // };




    // this.userService.addUser(user, "renter").subscribe(data => {
    //   var usr: User = data;
    //   if (usr._id != undefined) {
    //     this.userService.setUser(usr);
    //     this.router.navigate(['/user/'+usr._id+'/dashboard']);
    //   } else {
    //     console.log("Error creating user");
    //     debugger;
    //   }
    // });
  }

}
