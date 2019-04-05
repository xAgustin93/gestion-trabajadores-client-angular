import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components */
import { HomeComponent } from './components/home/home.component';
import { LoginRegistrationComponent } from './components/login-registration/login-registration.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login-registration', component: LoginRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
