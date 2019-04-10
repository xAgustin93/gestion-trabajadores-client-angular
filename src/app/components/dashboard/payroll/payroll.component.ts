import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

// Model
import { Payroll } from '../../../models/payroll';
import { Employee } from '../../../models/employee';

// Services
import { FunctionsServices } from '../../../services/functions.service';
import { PayrollService } from '../../../services/payroll.service';
import { EmployeeService } from '../../../services/employee.service';

declare var $: any;

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss'],
  providers: [FunctionsServices, PayrollService, EmployeeService]
})
export class PayrollComponent implements OnInit {

  public title: string = "Ultimas 24 Nominas";
  public roleEmployee: string;
  public employeeId: string;

  public employees: Employee[];
  public payroll: Payroll;
  public payrolls: Payroll[];
  public payrollDelete: Payroll;

  public filesToUpload;


  constructor(
    private _functionsServices: FunctionsServices,
    private _payrollService: PayrollService,
    private _employeeService: EmployeeService,
    private _toastrService: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.roleEmployee = this._functionsServices.getRole();
      this.employeeId = params['params'].id;
      
      this.payroll = new Payroll('', null, '', '');

      this.getEmployees();
      this.getPayrollsByEmployee();
    });
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

    const payroll = this.payroll;

    if(addPayrollForm.valid) {
      if(this.filesToUpload[0].type === "application/pdf"){

        const token = this._functionsServices.getToken();
        this._payrollService.addPayroll(payroll, token).subscribe(
          response => {
            let payrollId = response['payroll']._id;

            if(payrollId) {
              let url = this._functionsServices.getUrlApi();
              let file = this.filesToUpload;
              this.addFilePayroll(url + 'add-payroll-file/' + payrollId, [], file, token).then(
                (result: any) => {
                  this._toastrService.success('Nomina añadida');
                  this.payroll = new Payroll('', null, '', '');
                  $('#addPayroll').modal('hide');
                  $('#form-file').val('');
                  this.getPayrollsByEmployee();
                }
              );
            }

          }
        );

      } else {
        this._toastrService.warning('Solo esta permitido subir PDF');
      }
    
    }

  }

  changePayrollFile(fileInput) {
    this.filesToUpload = <File>fileInput.target.files;
  }

  addFilePayroll(url: string, params: Array<string>, files: Array<File>, token){

    return new Promise(function(resolve, reject){
      let formData: any = new FormData();
      let xhr = new XMLHttpRequest();

      for(let i = 0; i < files.length; i++){
        formData.append('file', files[i], files[i].name);
      }

      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }

      xhr.open('PUT', url, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    });
  }

  getPayrollsByEmployee() {
    let employeeId = this.employeeId;
    let token = this._functionsServices.getToken();

    this._payrollService.getPayrollsByEmployee(employeeId, token).subscribe(
      response => {
        this.payrolls = response['payrolls'];
      }
    );
  }

  formatDate(date) {
    return moment(String(date)).locale('es').format('MMMM YYYY');
  }

  getUrlPayroll(payrollName) {
    let urlApi = this._functionsServices.getUrlApi();
    let urlPayroll = `${urlApi}get-payroll-file/${payrollName}`;
    return urlPayroll;
  }

  deletePayrollPrepared(payroll) {
    this.payrollDelete = payroll;
  }

  deletePayroll() {
    const token = this._functionsServices.getToken();
    this._payrollService.deletePayrollById(this.payrollDelete._id, token).subscribe(
      response => {
        this._toastrService.success('Nomina eliminada');
        this.getPayrollsByEmployee();
      }
    );
  }

  changeSelectEmployee(event) {
    let employeeId = event.target.value;
    this._router.navigate(['/payroll/' + employeeId])
  }

}
