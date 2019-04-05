import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class FunctionsServices {

    constructor(
        private _router: Router,
    ) {}

    checkLogin() {
        let token = localStorage.getItem('token');
        let identity = localStorage.getItem('identity');

        if(!identity) {
            this._router.navigate(['/login-registration'])
        }
    }

    checkLoginPageLogin() {
        let token = localStorage.getItem('token');
        let identity = localStorage.getItem('identity');

        if(identity) {
            this._router.navigate(['/'])
        }
    }

}