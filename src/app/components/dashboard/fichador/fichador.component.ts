import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

// Model
import { Fichador } from '../../../models/fichador';
import { Employee } from '../../../models/employee';

// Services
import { FunctionsServices } from '../../../services/functions.service';
import { FichadorService } from '../../../services/fichador.service';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-fichador',
  templateUrl: './fichador.component.html',
  styleUrls: ['./fichador.component.scss'],
  providers: [FunctionsServices, FichadorService, EmployeeService]
})
export class FichadorComponent implements OnInit {

  public title: string;

  public fichajes: Fichador[];
  public lastFichaje: Fichador;

  constructor(
    private _functionsServices: FunctionsServices,
    private _fichadorService: FichadorService,
    private _employeeService: EmployeeService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.title = "Fichador"

    this.checkStatus();
  }


  checkStatus() {
    const token = this._functionsServices.getToken();
    const employeeId = JSON.parse(this._functionsServices.getIdentity())._id;

    this._fichadorService.checkStatus(employeeId, token).subscribe(
      response => {
        this.fichajes = response['fichajes'];
        this.checkLastFichaje();

        console.log(this.fichajes);
      }
    );
  }

  checkLastFichaje() {
    this.lastFichaje = this.fichajes[0];
  }

  checkIn() {
    const token = this._functionsServices.getToken();
    const employeeId = JSON.parse(this._functionsServices.getIdentity())._id;

    this._fichadorService.checkIn(employeeId, token).subscribe(
      response => {
        this.checkStatus();
        this._toastrService.success('Check-In Correcto, tu hora de entrada ha sido grabada.');
      }
    );
  }

  checkOut() {
    const token = this._functionsServices.getToken();
    const employeeId = JSON.parse(this._functionsServices.getIdentity())._id;

    this._fichadorService.checkOut(employeeId, token).subscribe(
      response => {
        this.checkStatus();
        this._toastrService.success('Check-Out Correcto, tu hora de salida ha sido grabada.');
      }
    );
  }


  dateTransform(date) {
    return moment(date).locale('ES').format('DD/MM/YYYY - LTS');
  }

}
