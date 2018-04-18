import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Support} from '../../models/support.interface';
import {SupportService} from '../../services/support.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @ViewChild('f') supportForm: NgForm;

  name: string;
  email: string;
  subject: string;
  message: string;
  sentFlag: boolean;

  constructor(private router: Router,
              private supportService: SupportService) { }

  ngOnInit() {
    this.sentFlag = false;
  }

  addMessage($event) {
    $event.preventDefault();
    this.name = this.supportForm.value.name;
    this.email = this.supportForm.value.email;
    this.subject = this.supportForm.value.subject;
    this.message = this.supportForm.value.message;

    const support: Support = {
      _id: "",
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message,
      mailLink: "",
      viewed: "false"
    };
    this.supportService.addMessage(support).subscribe(data => {
      this.sentFlag = true;
    });
    this.name="";
    this.email="";
    this.subject="";
    this.message="";
  }

}
