import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginCredentials, Token } from '../models/loginModel';
import { catchError, map, tap, mapTo } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';

/**
 * A login service to login, logout the user
 */
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  //Http options
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  //Login URL
  private loginUrl: string = 'http://localhost:8000/api-token-auth/';
  //Token refresh url
  private tokenRefreshUrl = 'http://localhost:8000/api-token-refresh/';

  //User Logged In status
  isUserLoggedIn: boolean = false;
  //Logged In user's username
  loggedUserName: string;

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Login the user
   * @param credentials - username, password to login the user
   */
  login(credentials: LoginCredentials): Observable<boolean> {
    return this.http
      .post<Token>(this.loginUrl, credentials, this.httpOptions)
      .pipe(
        tap(resp => {
          if (resp.token) {
            this.doLoginUser(resp, credentials.username);
          }
        }),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        })
      );
  }
  /**
   * Refresh the user token
   */
  refreshToken(): Observable<boolean> {
    const authToken = JSON.parse(localStorage.getItem('authToken'));

    return this.http
      .post<Token>(this.tokenRefreshUrl, authToken, this.httpOptions)
      .pipe(
        tap(resp => {
          if (resp.token) {
            this.doRefreshToken(resp);
          }
        }),
        mapTo(true),
        catchError(error => {
          console.log('token refresh erro');
          return of(false);
        })
      );
  }

  /**
   * Logout the user available from this service
   */
  public logoutUser() {
    this.doLogoutUser();
  }

  private doLoginUser(token: Token, username: string) {
    this.storeAuthToken(token);
    this.setUserName(username);
  }

  private doRefreshToken(token: any) {
    this.storeAuthToken(token);
  }

  /**
   * Logout the user, clear the tokens and redirect him to login page
   */
  private doLogoutUser() {
    localStorage.clear();
    this.changeLoginStatus(false);
    this.setUserName(null);
    window.location.assign('http://localhost:4200/signin');
  }

  /**
   *
   * @param token - Auth token from the server
   */
  private storeAuthToken(token: Token) {
    this.changeLoginStatus(true);
    localStorage.setItem('authToken', JSON.stringify(token));
  }

  private getToken() {
    return localStorage.getItem('token');
  }

  isUserLogged() {
    return this.isUserLoggedIn;
  }
  /**
   * Change login status of the user
   * @param status - login status of the current user
   */
  changeLoginStatus(status: boolean) {
    this.isUserLoggedIn = status;
  }

  /**
   * Set the username
   * @param name - username of the user
   */
  setUserName(name: string) {
    this.loggedUserName = name;
    localStorage.setItem('username', name);
  }
}
