import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components */
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginRegistrationComponent } from './components/login-registration/login-registration.component';
import { AdsComponent } from './components/dashboard/ads/ads.component';
import { UserSettingsComponent } from './components/dashboard/user-settings/user-settings.component';
import { ProposalsComponent } from './components/dashboard/proposals/proposals.component';
import { EmployeesComponent } from './components/dashboard/employees/employees.component';
import { HomeComponent } from './components/dashboard/home/home.component';
import { UpdateEmployeeComponent } from './components/dashboard/employees/update-employee/update-employee.component';
import { PayrollComponent } from './components/dashboard/payroll/payroll.component';
import { FichadorComponent } from './components/dashboard/fichador/fichador.component';


const routes: Routes = [
  { path: 'login-registration', component: LoginRegistrationComponent },
  { path: '', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '', component: HomeComponent },
      { path: 'ads', component: AdsComponent },
      { path: 'proposals', component: ProposalsComponent },
      { path: 'fichador', component: FichadorComponent },
      { path: 'payroll/:id', component: PayrollComponent },
      { path: 'user-settings', component: UserSettingsComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'employee/:id', component: UpdateEmployeeComponent },
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
