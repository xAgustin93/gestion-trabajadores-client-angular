import { Component, OnInit } from '@angular/core';

// Services
import { FunctionsServices } from '../../services/functions.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [FunctionsServices]
})
export class DashboardComponent implements OnInit {

  public title: string;

  constructor(
    private _functionsServices: FunctionsServices
  ) { }

  ngOnInit() {
    this._functionsServices.checkLogin();
  }

}