import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { FunctionsServices } from '../../services/functions.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [FunctionsServices]
})
export class HomeComponent implements OnInit {
  public title: string;

  // public identity: any;
  // public token: string;

  constructor(
    private _functionsServices: FunctionsServices,
    private _location: Location,
  ) { }

  ngOnInit() {
    this._functionsServices.checkLogin();
    // this.identity = localStorage.getItem('identity');
    // this.token = localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
    localStorage.clear();

    this._functionsServices.checkLogin();
  }


}
