import {User} from './user.interface';

export interface Car{
  _id: string;
  make: string;
  model:string;
  type: string;
  transmission: string;
  pricePerDay: number;
  description: string;
  year: number;
  fuel: string;
  mileage: number;
  photos: string[];
  vin: number;
  rating: number;
  renter: User;
  location: string;
  comments: any[];
}
