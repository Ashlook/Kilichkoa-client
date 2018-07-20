import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  /**
   * return the token from the localstorage
   */
  public getToken(): string {
    return localStorage.getItem('token');
  }

  /**
   * return the token decoded as a JSON object
   */
  public getDecodedToken(): Object {
    return this.jwtHelper.decodeToken(localStorage.getItem('token'));
  }

  /**
   * save the token in the localstorage
   * @param token the token to set
   */
  public setToken(token: string) {
    localStorage.setItem('token', token);
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
}
