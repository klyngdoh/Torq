import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { CarListingsComponent } from './components/car-listings/car-listings.component';
import { CarViewComponent } from './components/car-view/car-view.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import {CarNewComponent} from './components/car-new/car-new.component';
import {CustomerRegisterComponent} from "./components/register/customer-register/customer-register.component";
import {RenterRegisterComponent} from "./components/register/renter-register/renter-register.component";



const APP_ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'customer/register', component: CustomerRegisterComponent},
  {path: 'renter/register', component: RenterRegisterComponent},
  {path: 'user/:uid/profile', component: ProfileComponent},
  {path: 'user/:uid/dashboard', component: DashboardComponent},
  {path: 'car', component: CarListingsComponent},
  {path: 'car/new', component: CarNewComponent},
  {path: 'car/:cid', component: CarViewComponent},
  {path: 'car/:cid/checkout', component: CheckoutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'faqs', component: FaqsComponent},
  ];

// Export the routes as module providers
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
