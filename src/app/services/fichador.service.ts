import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { GLOBAL } from './global';


@Injectable()
export class FichadorService {
    private url: String;

    constructor(
        private _http: HttpClient
        ) {
        this.url = GLOBAL.url;
    }

    checkStatus(employeeId, token) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.get(this.url + 'check-status/' + employeeId, {headers: headers}).pipe(map((res: Response) => res));
    }

    checkIn(employeeId, token) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.post(this.url + 'check-in/' + employeeId, null, {headers: headers}).pipe(map((res: Response) => res));
    }

    checkOut(employeeId, token) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.post(this.url + 'check-out/' + employeeId, null, {headers: headers}).pipe(map((res: Response) => res));
    }

}