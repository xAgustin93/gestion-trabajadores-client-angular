import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { GLOBAL } from './global';


@Injectable()
export class AdService {
    private url: String;

    constructor(
        private _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    createAd(ad, token) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.post(this.url + 'add-ad', ad, {headers: headers}).pipe(map((res: Response) => res));
    }

    getAds(token) {
        const headers = new HttpHeaders({
            'Content-Type': 'apllication/json',
            'Authorization': token
        });
        return this._http.get(this.url + 'get-ads', {headers: headers}).pipe(map((res: Response) => res));
    }

    deleteAd(id, token) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.delete(this.url + 'delete-ad/' + id, {headers: headers}).pipe(map((res: Response) => res));
    }
}