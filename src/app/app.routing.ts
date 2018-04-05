import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

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
import {CustomerProfileComponent} from "./components/profile/customer-profile/customer-profile.component";


const APP_ROUTES : Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user/:uid/profile', component: CustomerProfileComponent},
  {path: 'user/:uid/dashboard', component: DashboardComponent},
  {path: 'car', component: CarListingsComponent},
  {path: 'car/:cid', component: CarViewComponent},
  {path: 'car/:cid/checkout', component: CheckoutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'faqs', component: FaqsComponent},
  {path: '**', component: HomeComponent},

  ];

// Export the routes as module providers
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
