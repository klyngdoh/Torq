export interface User{
  _id: string;
  username: string;
  password: string;
  type: UserType;
  email: string;
}

export enum UserType{
  Customer = 1,
  Renter,
  Administrator
}
