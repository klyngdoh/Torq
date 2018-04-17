import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.interface";

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }


  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  verify: string;
  dob: string;
  errorFlag: boolean;
  filesToUpload: Array<File> = [];


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

  fileChange(files: any){
    this.filesToUpload = <Array<File>>files.target.files;
  }

  register($event) {
    $event.preventDefault();
    // fetching data from loginForm
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.email = this.loginForm.value.email;
    this.firstName = this.loginForm.value.firstName;
    this.lastName = this.loginForm.value.lastName;
    this.dob = this.loginForm.value.dob;

    const _formData = new FormData();
    _formData.append("username", this.username);
    _formData.append("password", this.password);
    _formData.append("email", this.email);
    _formData.append("firstName", this.firstName);
    _formData.append("lastName", this.lastName);
    _formData.append("dob", this.dob);

    const files: Array<File> = this.filesToUpload;

    for(let i =0; i < files.length; i++){
      _formData.append("images[]", files[i], files[i]['name']);
    }

    this.userService.addUser(_formData, "customer").subscribe(data => {
      var usr: User = data;
      if (usr._id != undefined) {
        this.userService.setUser(usr);
        this.router.navigate(['/']);
      } else {
        console.log("Error creating user");
        }
      });


  }
}
