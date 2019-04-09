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

    addPayroll() {
        console.log('add PayRoll');           
    }

}