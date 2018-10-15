import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_model/user.model';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Drink } from '../_model/drink.model';
import { UserResponse } from '../_model/response/user-response.model';
import { UsersResponse } from '../_model/response/users-response.model';
import { DrinksResponse } from '../_model/response/drinks-response.model';
import { ErrorResponse } from '../_model/response/error-response.model';
import { DrinkResponse } from '../_model/response/drink-response.model';

const APP_URL = environment.appUrl;

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {}

  /**
   * Get an user by his username
   * @param username the username
   */
  public getUser(username: string): Observable<ErrorResponse | UserResponse> {
    return this.http
      .get(APP_URL + '/api/user/get/1/' + username)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get all users
   */
  public getAllUsers(): Observable<ErrorResponse | UsersResponse> {
    return this.http
      .get(APP_URL + '/api/user/get/all')
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get all active users
   */
  public getAllActiveUsers(): Observable<ErrorResponse | UsersResponse> {
    return this.http
      .get(APP_URL + '/api/user/get/active')
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Création d'un compte
   * @param user L'utilisateur à enregistrer
   */
  public createUser(user: User): Observable<ErrorResponse | UserResponse> {
    return this.http
      .post(APP_URL + '/api/user/create', user)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updatePassword(user: User): Observable<ErrorResponse | UserResponse> {
    return this.http
      .post(APP_URL + '/api/user/update/pwd', user)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateInfo(user: User): Observable<ErrorResponse | UserResponse> {
    return this.http
      .post(APP_URL + '/api/user/update/info', user)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getAllDrinks(): Observable<ErrorResponse | DrinksResponse> {
    return this.http
      .get(APP_URL + '/api/drink/get/all')
      .pipe(
        map((data: DrinksResponse) => {
          data.drinks.forEach(drink => drink.date_drink = new Date(drink.date_drink));
          return data;
        }),
        catchError(this.handleError)
      );
  }

  public getDrinksByDrinker(): Observable<ErrorResponse | DrinksResponse> {
    return this.http
      .get(APP_URL + '/api/drink/getByDrinker')
      .pipe(
        catchError(this.handleError)
      );
  }

  public createDrink(drink: Drink): Observable<ErrorResponse | DrinkResponse> {
    return this.http
      .post(APP_URL + '/api/drink/create', drink)
      .pipe(
        catchError(this.handleError)
      );
  }

  public deleteDrink(drink: Drink): Observable<any> {
    return this.http
      .get(APP_URL + '/api/drink/delete/' + drink._id)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: Response | any): Observable<any> {
    console.error('ApiService :: ', error);
    return throwError(error.error);
  }
}
