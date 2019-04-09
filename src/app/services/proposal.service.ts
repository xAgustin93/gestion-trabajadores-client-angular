import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { GLOBAL } from './global';


@Injectable()
export class ProposalService {
    private url: String;

    constructor(
        private _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    createPorposal(proposal, token) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.post(this.url + 'add-proposal', proposal, {headers: headers}).pipe(map((res: Response) => res));
    }

    getProposals(token) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.get(this.url + 'get-proposals', {headers: headers}).pipe(map((res: Response) => res));
    }

    updateProposal(proposal, token) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.put(this.url + 'update-proposal', proposal, {headers: headers}).pipe(map((res: Response) => res));
    }

    deleteProposal(proposalId, token) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.delete(this.url + 'delete-proposal/' + proposalId, {headers: headers}).pipe(map((res: Response) => res));
    }
}