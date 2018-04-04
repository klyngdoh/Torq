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
    return this.http.post("/api/user/register", user);
  }

  deleteUser(userId: string){

  }

  updateUser(userId: string, user:User){

  }

  getUserByCredentials(username: string, password:string) {
    var user:any = {};
    user['username'] = username;
    user['password'] = password;
    return this.http.post("/api/user/login", user);
  }

  getUserById(userId: string) {

  }
}
