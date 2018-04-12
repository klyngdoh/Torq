import {Component, OnInit, ViewChild} from '@angular/core';
import {CarService} from "../../services/cars.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('f') searchForm: NgForm;

  location: string;
  pickupDate: string;
  returnDate: string;


  constructor(private carService: CarService,
              private router: Router) { }

  ngOnInit() {
  }

  searchCars(){
    this.location  = this.searchForm.value.location;
    this.pickupDate  = this.searchForm.value.pickupDate;
    this.returnDate  = this.searchForm.value.returnDate;
    this.carService.getCars(this.location, this.pickupDate, this.returnDate)
      .subscribe((cars: any) =>{
        if(cars){
          console.log(cars);
          this.router.navigate(['/car']);
        }
      });

  }

}
