import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { FunctionsServices } from '../../services/functions.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [FunctionsServices]
})
export class HeaderComponent implements OnInit {


  constructor(
    private _functionsServices: FunctionsServices,
    private _location: Location,
  ) { }

  ngOnInit() { }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
    localStorage.clear();

    this._functionsServices.checkLogin();
  }

}
