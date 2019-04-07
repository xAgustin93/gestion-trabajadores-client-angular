import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

// Models
import { Employee } from '../../../models/employee';

// Services
import { FunctionsServices } from '../../../services/functions.service';
import { EmployeeService } from '../../../services/employee.service';

// Icons
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

declare var $: any;


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [FunctionsServices, EmployeeService]
})
export class EmployeesComponent implements OnInit {

  public title: String;
  public roleAdmin: Boolean;

  public employees: Employee[];

  public employee: Employee;
  public password: String;
  public passwordRepeat: String;

  public employeeDelete: Employee;

  public employeesActiveCount: number;
  public employeesDisabledCount: number;

  // Icons
  public faTrashAlt = faTrashAlt;
  public faEdit = faEdit;
  public faCheck = faCheck;
  public faTimes = faTimes;


  constructor(
    private _functionsServices: FunctionsServices,
    private _employeeService: EmployeeService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.title = 'Empleados';
    this.roleAdmin = this._functionsServices.getRole();
    this.getEmployes();
    this.employee = new Employee('', '', '', '', '', '', '', '', '', '', '', '', '', false);
  }

  getEmployes() {
    const token = this._functionsServices.getToken();

    this._employeeService.getEmployees(token).subscribe(
      resolver => {
        this.employees = resolver['employees'];
        this.countEmployeeActiveAndDisabled();
      }
    )
  }

  createEmployee(createEmployeeForm) {
    if(this.password !== this.passwordRepeat) {
      this._toastrService.warning('Las contraseñas no son iguales.');
    } else {
      if(!createEmployeeForm.valid) {
        this._toastrService.warning('Rellena todos los campos para poder crear el usaurio.');
      } else {
        const token = this._functionsServices.getToken();
        this.employee.password = this.password;

        this._employeeService.createEmployee(this.employee, token).subscribe(
          resolve => {
            $('#newEmployee').modal('hide');
            this._toastrService.success('Usuario creado correctamente');
            this.employee = new Employee('', '', '', '', '', '', '', '', '', '', '', '', '', false);
            this.password = "";
            this.passwordRepeat = "";
            this.getEmployes();
          },
          error => {
            this._toastrService.warning('El usuario ya esta en uso');
          }
        )
      }
    }
  }

  deleteEmployeePrepared(employee) {
    this.employeeDelete = employee;
  }
  deleteEmployee(employeeId) {
    const token = this._functionsServices.getToken();
    this._employeeService.deleteEmployee(employeeId, token).subscribe(
      resolve => {
        this.getEmployes();
      }
    );
  }

  typeContractChange() {
    if(this.employee.type_contract === "indefinite") {
      this.employee.end_contract = '01-01-0001';
    } else {
      this.employee.end_contract = "";
    }
  }

  countEmployeeActiveAndDisabled() {

    this.employeesActiveCount = 0;
    this.employeesDisabledCount = 0;

    this.employees.forEach(employee => {
      if(employee.active){
        this.employeesActiveCount ++;
      } else {
        this.employeesDisabledCount ++;
      }
    });
  }

  activateEmployee(employee) {
    let activateEmployee = employee;
    activateEmployee.active = true;

    const token = this._functionsServices.getToken();

    this._employeeService.updateEmployee(activateEmployee, token).subscribe(
      response => {
        this._toastrService.success('Empleado activado');
        this.countEmployeeActiveAndDisabled();
      }
    )
  }

  disableEmployee(employee) {
    let disableEmployee = employee;
    disableEmployee.active = false;

    const token = this._functionsServices.getToken();

    this._employeeService.updateEmployee(disableEmployee, token).subscribe(
      response => {
        this._toastrService.success('Empleado desactivado');
        this.countEmployeeActiveAndDisabled();
      }
    )
  }

}