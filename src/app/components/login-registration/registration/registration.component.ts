import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ToastrService } from 'ngx-toastr';


/* Services */
import { GLOBAL } from './../../../services/global';
import { EmployeeService } from './../../../services/employee.service';

/* Models */
import { Employee } from './../../../models/employee';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [EmployeeService]
})
export class RegistrationComponent implements OnInit {

  public employee: Employee;

  public password: String;
  public passwordRepeat: String;

  constructor(
    private _employeeService: EmployeeService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.employee = new Employee('', '', '', '', '', '', '', '', '', '', '', '', '', false);
  }

  registration(registrationForm) {
    if(this.employee.name == "" || this.employee.lastname == "" || this.employee.email == "") {
      this._toastrService.error('Rellena todos los campos del registro.');
    } else {
      if(this.password !== this.passwordRepeat){
        this._toastrService.error('Las contraseñas no son iguales.');
      } else {
        this.employee.password = this.password;

        if(registrationForm.form.status === 'VALID') {

          this._employeeService.registrationEmployee(this.employee).subscribe(
            response => {
              this._toastrService.success('Registro correcto.');
              this.resetForm();
            },
            error => {
              this._toastrService.error('El email ya esta en uso.');
            }
          );

        }
      }
    }
  }

  resetForm(){
    this.employee = new Employee('', '', '', '', '', '', '', '', '', '', '', '', '', false);
    this.password = '';
    this.passwordRepeat = '';
  }

}
