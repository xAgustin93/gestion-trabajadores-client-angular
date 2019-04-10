import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { GLOBAL } from './global';


@Injectable()
export class PayrollService {
    private url: String;

    constructor(
        private _http: HttpClient
        ) {
        this.url = GLOBAL.url;
    }

    addPayroll(payroll, token) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.post(this.url + 'add-payroll', payroll, {headers: headers}).pipe(map((res: Response) => res));
    }

    getPayrollsByEmployee(employeeId, token) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.get(this.url + 'get-payrolls-by-employee/' + employeeId, {headers: headers}).pipe(map((res: Response) => res));
    }

    deletePayrollById(payrollId, token) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.delete(this.url + 'delete-payroll-by-id/' + payrollId, {headers: headers}).pipe(map((res: Response) => res));
    }

}