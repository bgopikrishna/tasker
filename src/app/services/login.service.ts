import { Injectable } from '@angular/core';
import { LoginCredentials, Token } from '../models/loginModel';
import { catchError, tap, mapTo } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { SyncService } from './sync.service';

/**
 * A login service to login, logout the user
 */
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  //Login Endpoint
  private loginEndPoint: string = 'api-token-auth/';
  //Token refresh Endpoint
  private tokenRefreshEndpoint: string = 'api-token-refresh/';

  //User LoggedIn status
  isUserLoggedIn: boolean = false;
  //LoggedIn user's username
  loggedUserName: string;

  constructor(private syncService: SyncService) {}

  /**
   * Login the user
   * @param credentials - username, password to login the user
   */
  login(credentials: LoginCredentials): Observable<boolean> {
    return this.syncService.syncPost(this.loginEndPoint, credentials).pipe(
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

    return this.syncService.syncPost(this.tokenRefreshEndpoint, authToken).pipe(
      tap(resp => {
        if (resp.token) {
          this.doRefreshToken(resp);
        }
      }),
      mapTo(true),
      catchError(error => {
        console.log('token refresh error:', error);
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
   * store the authtoken returned from the server in the local storage
   * @param token - Auth token returned from the server
   */
  private storeAuthToken(token: Token) {
    this.changeLoginStatus(true);
    localStorage.setItem('authToken', JSON.stringify(token));
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
