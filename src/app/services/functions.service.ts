import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { GLOBAL } from './global';

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

    getRole() {
        let identity = localStorage.getItem('identity');
        let identityJson = JSON.parse(identity);        
        return identityJson.role;
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getIdentity() {
        return localStorage.getItem('identity');
    }

    checkRoleAdmin() {
        let identity = localStorage.getItem('identity');
        let identityJson = JSON.parse(identity);  
        
        if(identityJson.role === "ROLE_ADMIN") {
            return true;
        } else {
            return false;
        }
    }

    getUrlApi() {
        return GLOBAL.url;
    }

}