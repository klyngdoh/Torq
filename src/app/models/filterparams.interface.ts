import {CarType, FuelType, TransmissionType} from "./car.interface";

export interface FilterParams{
  fuelType: FuelType[];
  carType: CarType[];
  transmission: TransmissionType[];
  priceLow: number;
  priceHigh: number;

}
