import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

// Services
import { FunctionsServices } from '../../../services/functions.service';
import { EmployeeService } from '../../../services/employee.service';

// Models
import { Employee } from '../../../models/employee';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
  providers: [FunctionsServices, EmployeeService]
})
export class UserSettingsComponent implements OnInit {

  public title: String;
  public employeeId: String;

  public employee: any;

  public password: String;
  public passwordRepeat: String;

  constructor(
    private _functionsServices: FunctionsServices,
    private _employeeService: EmployeeService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.title = "Configuracion";
    this.employeeId = JSON.parse(this._functionsServices.getIdentity())._id;
    this.getEmpoyee();
  }

  getEmpoyee() {
    const token: String = this._functionsServices.getToken();

    this._employeeService.getEmployeeById(this.employeeId, token).subscribe(
      response => {
        this.employee = response;
      }
    );
  }

  updateEmployee(updateEmployeeForm) {

    if(this.password === this.passwordRepeat) {

      if(this.password) {
        this.employee.password = this.password;
      }

      if(!updateEmployeeForm.valid) {
        this._toastrService.warning('Rellena todos los campos de las secciónes [Informacion del Empleado] [Informacion del Banco] porfavor');
      } else {
        const token = this._functionsServices.getToken();
        this._employeeService.updateEmployee(this.employee, token).subscribe(
          response => {
            const employee = response['employee'];
            this._toastrService.success('Los datos se han actualizado correctamente');
            document.getElementById('employee-name').innerHTML = employee.name + ' ' + employee.lastname;

            localStorage.setItem('identity', JSON.stringify(this.employee));
          }
        );
      }

    } else {
      this._toastrService.warning('Las contraseñas no son iguales');
    }

  }

  formatDate(date) {
    return moment(date).format('L');
  }

}
