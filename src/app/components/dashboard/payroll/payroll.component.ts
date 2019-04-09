import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

// Model
import { Payroll } from '../../../models/payroll';
import { Employee } from '../../../models/employee';

// Services
import { FunctionsServices } from '../../../services/functions.service';
import { PayrollService } from '../../../services/payroll.service';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss'],
  providers: [FunctionsServices, PayrollService, EmployeeService]
})
export class PayrollComponent implements OnInit {

  public title: string = "Nominas";
  public roleEmployee: string;

  public employees: Employee[];
  public payroll: Payroll;

  constructor(
    private _functionsServices: FunctionsServices,
    private _payrollService: PayrollService,
    private _employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.roleEmployee = this._functionsServices.getRole();
    
    this.payroll = new Payroll('', '', '', '');

    this.getEmployees();
  }

  getEmployees() {
    let token = this._functionsServices.getToken();

    this._employeeService.getEmployees(token).subscribe(
      response => {
        this.employees = response['employees'];
      }
    );
  }

  addPayroll(addPayrollForm) {
    console.log(this.payroll);
  }


  changePayrollFile(event) {
    console.log(event)
  }

}
