import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { GLOBAL } from './global';


@Injectable()
export class EmployeeService {
    private url: String;

    constructor(
        private _http: HttpClient
        ) {
        this.url = GLOBAL.url;
    }

    loginEmployee(user_to_login, gethash = null) {

        if(gethash != null){
            user_to_login.gethash = gethash;
        }

        const json: string = JSON.stringify(user_to_login);
        const params = json;

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });        

        return this._http.post(this.url + 'login', params, { headers: headers }).pipe(map((res: Response) => res));            
    }

    registrationEmployee(employee){;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this._http.post(this.url + 'registration-employee', employee, {headers: headers}).pipe(map((res: Response) => res));
    }

    getEmployeeById(employeeId, token) {
        const headers = new HttpHeaders({
            'Content-Type': 'aplication/json',
            'Authorization': token
        });
        return this._http.get(this.url + 'get-employee-by-id/' + employeeId, {headers: headers}).pipe(map((res: Response) => res));
    }

    updateEmployee(employee, token) {
        const json: string = JSON.stringify(employee);
        const params = json;

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.put(this.url + 'update-employee-by-id', params, {headers: headers}).pipe(map((res: Response) => res));
    }

    getEmployees(token) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.get(this.url + 'get-employees', {headers: headers}).pipe(map((res: Response) => res));
    }

    createEmployee(employee, token) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.post(this.url + 'create-employee', employee, {headers: headers}).pipe(map((res: Response) => res));
    }

    deleteEmployee(employeeId, token) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.delete(this.url + 'delete-employee/' + employeeId, {headers: headers}).pipe(map((res: Response) => res));
    }
}