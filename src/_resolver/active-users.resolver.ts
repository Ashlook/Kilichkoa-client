import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { ApiService } from '../_service/api.service';
import { take, catchError } from 'rxjs/operators';
import { ErrorResponse } from '../_model/response/error-response.model';
import { UsersResponse } from '../_model/response/users-response.model';

@Injectable()
export class ActiveUsersResolver implements Resolve<ErrorResponse | UsersResponse> {

  constructor(
    private api: ApiService
  ) { }

  resolve(): Observable<ErrorResponse | UsersResponse> {
    return this.api.getAllActiveUsers()
      .pipe(
        take(1),
        catchError(err => EMPTY)
      );
  }
}
