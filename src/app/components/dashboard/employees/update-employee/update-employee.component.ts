import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

// Models
import { Employee } from '../../../../models/employee';

// Services
import { FunctionsServices } from '../../../../services/functions.service';
import { EmployeeService } from '../../../../services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
  providers: [FunctionsServices, EmployeeService]
})
export class UpdateEmployeeComponent implements OnInit {

  public employee: any;
  public employeeId: String;

  public password: String;
  public passwordRepeat: String;

  constructor(
    private _functionsServices: FunctionsServices,
    private _employeeService: EmployeeService,
    private _toastrService: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.employeeId = this._activatedRoute.snapshot.paramMap.get("id");
    this.getEmployeeById();
  }

  getEmployeeById(){
    const token = this._functionsServices.getToken();
    this._employeeService.getEmployeeById(this.employeeId, token).subscribe(
      resolve => {
        this.employee = resolve;
        this.formatDateEmployee();
      }
    )
  }

  updateEmployee(updateEmployeeForm) {

    if(this.password === this.passwordRepeat) {

      if(this.password) {
        this.employee.password = this.password;
      }

      if(updateEmployeeForm.valid) {
        const token = this._functionsServices.getToken();

        this._employeeService.updateEmployee(this.employee, token).subscribe(
          response => {
            this._toastrService.success('Empleado actualizado.')
            this._router.navigateByUrl('/employees');
          }
        )
      } else {
        this._toastrService.warning('Rellena todos los datos del formulario.')
      }

    }
    
  }

  typeContractChange() {
    if(this.employee.type_contract === "indefinite") {
      this.employee.end_contract = '01-01-0001';
    } else {
      this.employee.end_contract = "";
    }
  }

  formatDateEmployee(){
    if(this.employee.start_contract) {
      let start_contract = this.employee.start_contract;
      start_contract = moment(String(start_contract)).format('YYYY-MM-DD');
      this.employee.start_contract = start_contract;
    }

    if(this.employee.end_contract) {
      let end_contract = this.employee.end_contract;
      end_contract = moment(String(end_contract)).format('YYYY-MM-DD');
      this.employee.end_contract = end_contract;
    }
  }

}