import {FilterParams} from "./filterparams.interface";

export interface SearchParams {
  location: string;
  pickupDate: string;
  returnDate: string;
  filterParams: FilterParams;
}
