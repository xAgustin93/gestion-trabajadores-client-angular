import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


/* Routing */
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { MenuLeftComponent } from './components/menu-left/menu-left.component';

import { LoginRegistrationComponent } from './components/login-registration/login-registration.component';
import { LoginComponent } from './components/login-registration/login/login.component';
import { RegistrationComponent } from './components/login-registration/registration/registration.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdsComponent } from './components/dashboard/ads/ads.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { EmployeesComponent } from './components/dashboard/employees/employees.component';
import { ProposalsComponent } from './components/dashboard/proposals/proposals.component';
import { UserSettingsComponent } from './components/dashboard/user-settings/user-settings.component';
import { UpdateEmployeeComponent } from './components/dashboard/employees/update-employee/update-employee.component';
import { PayrollComponent } from './components/dashboard/payroll/payroll.component';
import { FichadorComponent } from './components/dashboard/fichador/fichador.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    LoginRegistrationComponent,
    DashboardComponent,
    AdsComponent,
    HeaderComponent,
    MenuLeftComponent,
    HomeComponent,
    EmployeesComponent,
    ProposalsComponent,
    UserSettingsComponent,
    UpdateEmployeeComponent,
    PayrollComponent,
    FichadorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
