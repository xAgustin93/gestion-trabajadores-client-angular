import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ToastrService } from 'ngx-toastr';


/* Services */
import { GLOBAL } from './../../../services/global';
import { FunctionsServices } from './../../../services/functions.service';
import { EmployeeService } from './../../../services/employee.service';

/* Models */
import { Employee } from './../../../models/employee';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [EmployeeService, EmployeeService]
})
export class LoginComponent implements OnInit {

  public url: string;

  public identity: any;
  public token: string;

  public employee: Employee;
  public email: String;
  public password: String;

  constructor(
    private _functionsServices: FunctionsServices,
    private _employeeService: EmployeeService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.url = GLOBAL.url;
    this.employee = this.employee = new Employee('', '', '', '', '', '', '', '', '', '', '', '', '', false);

    this.identity = localStorage.getItem('identity');
    this.token = localStorage.getItem('token');

    
  }

  login() {
    this.employee.email = this.email;
    this.employee.password = this.password;

    this._employeeService.loginEmployee(this.employee).subscribe(
      response => {
                
        this.identity = response['employee'];

        if(!this.identity._id){
          this._toastrService.error('Los datos del usuario son incorrectos.')
        } else {

          if(this.identity.active === false){
            this._toastrService.error('EL usuario esta desactivado, hable con el administrador.')
          } else {
            // Crear elemento en el local Storage para tener al usuario en sesion
            localStorage.setItem('identity', JSON.stringify(this.identity));
            
            // Conseguir el token para enviarselo a cada peticion http
            this._employeeService.loginEmployee(this.employee, 'true').subscribe(
              response => {
                this.token = response['token'];              
                if(this.token.length <= 0){
                  this._toastrService.error('Los datos del usuario son incorrectos.')
                } else {
                  // Creamos el elemento en localStorage para tener el TOKEN disponible.
                  localStorage.setItem('token', this.token);
                  this._functionsServices.checkLoginPageLogin();
                }
              },
              error => {
                this._toastrService.error('Los datos del usuario son incorrectos.')
              }
            );
          }

        }
      },
      error => {
        this._toastrService.error('Los datos del usuario son incorrectos.')
      }
    );
  }

}
