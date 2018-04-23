import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {FilterParams} from "../../models/filterparams.interface";
import {SearchParams} from '../../models/searchparams.interface';
import {Car} from '../../models/car.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {CarService} from '../../services/cars.service';

@Component({
  selector: 'app-car-listings',
  templateUrl: './car-listings.component.html',
  styleUrls: ['./car-listings.component.css']
})
export class CarListingsComponent implements OnInit, AfterViewInit {

  constructor(private activatedRoute: ActivatedRoute, private carService: CarService, private router: Router) {
  }

  cars: Car[];
  searchParams: SearchParams;
  filterParams: FilterParams;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.searchParams = {
        location: params['location'],
        pickupDate: params['pickupDate'],
        returnDate: params['returnDate'],
        filterParams: undefined
      };
    });

    this.carService.getCars(this.searchParams)
      .subscribe((result: Car[]) => {
        this.cars = result;
      });
  }

  filter($event) {
    $event.preventDefault();
    var price = getSliderValues();

    this.filterParams = {
      carType: getCheckedElements("carType"),
      fuelType: getCheckedElements("fuelType"),
      transmission: getCheckedElements("transmissionType"),
      priceLow: price[0],
      priceHigh: price[1]
    };
    this.searchParams.filterParams = this.filterParams;

    this.carService.getCars(this.searchParams)
      .subscribe((result: Car[]) => {
        this.cars = result;
      });
  }

  carView($event, id) {
    $event.preventDefault();
    $event.stopPropagation();
    this.router.navigate(['/car/'+id], {queryParams: {location: this.searchParams.location, pickupDate: this.searchParams.pickupDate, returnDate: this.searchParams.returnDate}});
  }

  checkout($event, id) {
    $event.preventDefault();
    $event.stopPropagation();
    this.router.navigate(['/car/'+id +'/checkout'], {queryParams: {location: this.searchParams.location, pickupDate: this.searchParams.pickupDate, returnDate: this.searchParams.returnDate}});
  }

  ngAfterViewInit(): void {
    buildFilterWidget();
  }


}

declare var getCheckedElements;
declare var getSliderValues;
declare var buildFilterWidget;
