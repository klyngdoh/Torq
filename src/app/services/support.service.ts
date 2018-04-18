// injecting service into module
import {EventEmitter, Injectable, Output} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Support} from '../models/support.interface';

@Injectable()
export class SupportService {

  constructor(private http: HttpClient) {
  }

  api = {
    'addMessage': this.addMessage,
    'getUnreadMessages': this.getUnreadMessages,
    'getReadMessage': this.getReadMessages,
    'viewMessage': this.viewMessage
  };

  support:Support;

  addMessage(support:Support) {
    return this.http.post<Support>("/api/support/messages", support);
  }

  getUnreadMessages() {
    return this.http.get("api/support/unread");
  }

  getReadMessages() {
    return this.http.get("api/support/read");
  }

  viewMessage(support: Support) {
    debugger;
    return this.http.post<Support>("api/support/view", support);
  }
}
