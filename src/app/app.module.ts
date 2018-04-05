import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CarListingsComponent } from './components/car-listings/car-listings.component';
import { CarViewComponent } from './components/car-view/car-view.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ContactComponent } from './components/contact/contact.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './components/dashboard/customer-dashboard/customer-dashboard.component';
import { RenterDashboardComponent } from './components/dashboard/renter-dashboard/renter-dashboard.component';
import { CustomerProfileComponent } from './components/profile/customer-profile/customer-profile.component';
import { RenterProfileComponent } from './components/profile/renter-profile/renter-profile.component';
import { CustomerRegisterComponent } from './components/register/customer-register/customer-register.component';
import { RenterRegisterComponent } from './components/register/renter-register/renter-register.component';
import {Routing} from "./app.routing";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CarsService} from "./services/cars.service";
import {UserService} from "./services/user.service";
import { HeaderComponent } from './components/header/header.component';
import { CarNewComponent } from './components/car-new/car-new.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarListingsComponent,
    CarViewComponent,
    CheckoutComponent,
    DashboardComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    FaqsComponent,
    AdminDashboardComponent,
    CustomerDashboardComponent,
    RenterDashboardComponent,
    CustomerProfileComponent,
    RenterProfileComponent,
    CustomerRegisterComponent,
    RenterRegisterComponent,
    HeaderComponent,
    CarNewComponent,
  ],
  imports: [
    BrowserModule,
    Routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [CarsService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
