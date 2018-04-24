import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {CarService} from "../../services/cars.service";


@Component({
  selector: 'app-commentPage',
  templateUrl: './commentPage.component.html',
  styleUrls: ['./commentPage.component.css']
})
export class CommentComponent implements OnInit, AfterViewInit {

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private carService: CarService,
              private router: Router) { }

  type: string;
  //customerId: string;
  commentById: string;
  commentOnId: string;
  //carId: string;
  name: string;  // name = firstName+LastName for customer type || name = year + make + model for car type
  comment :string;

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: any) => {

      this.type = params['type'];

      if(this.type == 'customer'){
       // this.customerId = params['id'];
        this.commentOnId = params['id'];
        this.userService.getUserById(this.commentOnId)
          .subscribe((user) => {
            this.name = user.firstName + ' ' + user.lastName;
          });
      }

      else{
        //this.carId = params['id'];
        this.commentOnId = params['id'];
        this.carService.getCarById(this.commentOnId)
          .subscribe((car) => {
            this.name = car.year + ' ' + car.make + ' ' + car.model;
          });
      }


    });

  }

  ngAfterViewInit() {
    createRateYo("#starRating");
  }

  submitComment(comment: string){
    var rating: any = getRating("#starRating");
    debugger;
    if(this.type == 'customer'){
      console.log('Im in customer type submit component');
      this.userService.addComment(this.commentOnId, comment, rating)
        .subscribe((comment)=>{
          this.router.navigate(['/user/' + this.commentOnId + '/profile']);
        });
    }
    else{
      this.carService.addComment(this.commentOnId, comment, rating)
        .subscribe((comment)=>{
          this.router.navigate(['/car/' + this.commentOnId]);
        });
    }
  }


}

declare var createRateYo;
declare var getRating;
