import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { GLOBAL } from './global';


@Injectable()
export class EmployeeService {
    private url: String;
    private identity;
    private identityJson;
    private token;

    constructor(
        private _http: HttpClient
        ) {
        this.url = GLOBAL.url;
        // this.identity = localStorage.getItem('identity');
        // this.identityJson = JSON.parse(this.identity);
        // this.token = localStorage.getItem('token');
    }

    loginEmployee(user_to_login, gethash = null) {

        if(gethash != null){
            user_to_login.gethash = gethash;
        }

        let json: string = JSON.stringify(user_to_login);
        let params = json;

        let headers = new HttpHeaders({'Content-Type':'application/json'});        

        return this._http.post(this.url + 'login', params, { headers: headers }).pipe(map((res: Response) => res));            
    }

    registrationEmployee(employee){;
        let headers = new HttpHeaders({
            'Content-Type':'application/json'
        });
        return this._http.post(this.url + 'registration-employee', employee, {headers: headers}).pipe(map((res: Response) => res));
    }

}