import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components */
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginRegistrationComponent } from './components/login-registration/login-registration.component';
import { AdsComponent } from './components/dashboard/ads/ads.component';
import { UserSettingsComponent } from './components/dashboard/user-settings/user-settings.component';
import { ProposalsComponent } from './components/dashboard/proposals/proposals.component';
import { EmployeesComponent } from './components/dashboard/employees/employees.component';


const routes: Routes = [
  { path: 'login-registration', component: LoginRegistrationComponent },
  { path: '', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'ads', component: AdsComponent },
      { path: 'user-settings', component: UserSettingsComponent },
      { path: 'proposals', component: ProposalsComponent },
      { path: 'employees', component: EmployeesComponent },
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
