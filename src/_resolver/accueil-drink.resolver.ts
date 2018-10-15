import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiService } from '../_service/api.service';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DrinksResponse } from '../_model/response/drinks-response.model';
import { ErrorResponse } from '../_model/response/error-response.model';

@Injectable()
export class AccueilDrinkResolver implements Resolve<ErrorResponse | DrinksResponse> {

    constructor(
        private api: ApiService,
    ) {}

    resolve(): Observable<ErrorResponse | DrinksResponse> {
        return this.api.getAllDrinks()
            .pipe(
                catchError((err: ErrorResponse) => EMPTY)
            );
    }

}
