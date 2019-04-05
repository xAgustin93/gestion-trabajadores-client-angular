import { Component, OnInit } from '@angular/core';

import { FunctionsServices } from './../../services/functions.service'

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.scss'],
  providers: [FunctionsServices]
})
export class LoginRegistrationComponent implements OnInit {

  constructor(
    private _functionsServices: FunctionsServices
  ) { }

  ngOnInit() {
    this._functionsServices.checkLoginPageLogin();
  }

}
