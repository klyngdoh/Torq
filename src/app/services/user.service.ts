// injecting service into module
import {EventEmitter, Injectable, Output} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.interface";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  @Output() getLoggedInUser: EventEmitter<User> = new EventEmitter();


  api = {
    'addUser': this.addUser,
    'deleteUser': this.deleteUser,
    'updateUser': this.updateUser,
    'getUserByCredentials': this.getUserByCredentials,
    'getUserById': this.getUserById,
    'logout': this.logout,
    'fbLogin': this.fbLogin
  };

  user:User;

  addUser(user: FormData, type:string) {
    return this.http.post<User>("/api/user/"+type+"/register", user);
  }

  deleteUser(userId: string){

  }

  updateUser(userId: string, user:User){

  }

  getUserByCredentials(username: string, password:string) {
    var user:any = {};
    user['username'] = username;
    user['password'] = password;
    return this.http.post<User>("/api/user/login", user);
  }

  getUserById(userId: string) {
    return this.http.get<User>("/api/user/"+userId);
  }

  setUser(user:User) {
    this.user = user;
    this.getLoggedInUser.emit(user);
  }

  getUser(){
    return this.user;
  }

  fbLogin(user) {
    return this.http.post<User>("/api/user/fbLogin", user);
  }

  logout() {
    this.setUser(null);
    return this.http.get("/api/user/logout");
  }

  addComment(commentOnId: string, comment: string){

    var commentObject = {commentorId: "", commentorName: "", comment: comment};
    return this.http.post("/api/user/" + commentOnId + "/comment", commentObject);
  }
}
