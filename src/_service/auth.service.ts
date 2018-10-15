import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { User } from '../_model/user.model';
import { Observable, EMPTY, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';


const APP_URL = environment.appUrl;

@Injectable()
export class AuthService {

  private jwtHelper = new JwtHelperService();

  public isActive: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient
  ) {}

  /**
   * return the token from the localstorage
   */
  public getToken(): string {
    return localStorage.getItem('token');
  }

  /**
   * return the token decoded as a JSON object
   */
  public getDecodedToken(): { id: string, admin: boolean, username: string, exp: number, iat: number, active: boolean } {
    return this.jwtHelper.decodeToken(localStorage.getItem('token'));
  }

  /**
   * save the token in the localstorage
   * @param token the token to set
   */
  public setToken(token: string) {
    localStorage.setItem('token', token);
    this.isActive.next(this.getDecodedToken().active);
    this.isAdmin.next(this.getDecodedToken().admin);
  }

  /**
   * Check clientside if user is auth, token signature isn't checked
   * must be done serverside
   */
  public isAuth(): Boolean {
    const token = this.getToken();
    // Token exist
    if (token) {
      try {
        // Valid format
        this.jwtHelper.decodeToken(token);
        // Not expired
        return !this.jwtHelper.isTokenExpired(token);
      } catch (error) {
        console.error(error);
        return false;
      }
    }
    return false;
  }

  /**
   * Remove the token from the localstorage
   */
  public signOff() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      this.isActive.next(false);
      this.isAdmin.next(false);
    }
  }

  /**
   * Authentification sur le serveur pour recuperer le token.
   * @param user les donnees utilisateur
   */
  public authenticate(user: User): Observable<any> {
    return this.http
      .post(APP_URL + '/authenticate', user)
      .pipe(catchError(err => throwError(err.error)));
  }

  get username(): string {
    return this.isAuth() ? this.getDecodedToken().username : null;
  }
}
