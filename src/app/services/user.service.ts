// injecting service into module
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.interface";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }


  api = {
    'addUser': this.addUser,
    'deleteUser': this.deleteUser,
    'updateUser': this.updateUser,
    'getUserByCredentials': this.getUserByCredentials,
    'getUserById': this.getUserById
  };

  addUser(user:User) {

  }

  deleteUser(userId: string){

  }

  updateUser(userId: string, user:User){

  }

  getUserByCredentials(username: string, password:string) {

  }

  getUserById(userId: string) {

  }
}
