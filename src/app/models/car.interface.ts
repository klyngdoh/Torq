export interface Car{
  _id: string;
  name:string;
  type: CarType;
  transmission: TransmissionType;
  pricePerDay: number;
  rating: number;
  description: string;
  year: number;
  fuel: string;
  mileage: number;
  images: string[];
}

export enum CarType {
  Compact = 1,
  Sedan,
  Suv,
  Sports,
  Luxury
}

export enum TransmissionType {
  Manual = 1,
  Automatic
}

export enum FuelType {
  Petrol = 1,
  Diesel
}
