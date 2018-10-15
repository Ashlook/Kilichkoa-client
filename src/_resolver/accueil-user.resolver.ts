import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { User } from '../_model/user.model';
import { ApiService } from '../_service/api.service';
import { ApiResponse } from '../_model/response/api-response.model';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AccueilUserResolver implements Resolve<ApiResponse> {

  constructor(
    private api: ApiService,
    private sb: MatSnackBar
  ) { }

  resolve(): Observable<ApiResponse> {
    return this.api.getAllUsers()
      .pipe(
        catchError((err: ApiResponse) => {
          this.sb.open(err.message, null, { duration: 2000 });
          return EMPTY;
        })
      );
  }

}
