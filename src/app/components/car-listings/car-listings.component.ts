import {Component, OnInit} from '@angular/core';
import {FilterParams} from "../../models/filterparams.interface";

@Component({
  selector: 'app-car-listings',
  templateUrl: './car-listings.component.html',
  styleUrls: ['./car-listings.component.css']
})
export class CarListingsComponent implements OnInit {

  constructor() {
  }

  filterParams: FilterParams;

  ngOnInit() {

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
    debugger;
  }

}

declare var getCheckedElements;
declare var getSliderValues;
