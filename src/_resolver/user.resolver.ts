import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { ErrorResponse } from '../_model/response/error-response.model';
import { UserResponse } from '../_model/response/user-response.model';
import { ApiService } from '../_service/api.service';
import { AuthService } from '../_service/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserResolver implements Resolve<ErrorResponse | UserResponse> {

    constructor(
        private api: ApiService,
        private auth: AuthService
    ) {}

    resolve(): Observable<ErrorResponse | UserResponse> {
        return this.api.getUser(this.auth.username)
            .pipe(
                catchError((err: ErrorResponse) => EMPTY)
            );
    }

}
