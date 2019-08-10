import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginCredentials, Token } from '../models/loginModel';
import { catchError, map, tap, mapTo } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

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
  private tokenRefreshUrl = 'http://localhost:8000/api-token-refresh/';

  isUserLoggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  public login(credentials: LoginCredentials): Observable<boolean> {
    return this.http
      .post<Token>(this.loginUrl, credentials, this.httpOptions)
      .pipe(
        tap(token => {
          this.doLoginUser(token);
          console.log(token);
        }),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        })
      );
  }

  refreshToken() {
    const authToken = JSON.parse(localStorage.getItem('authToken'));
    const token = authToken.token;

    this.http.post<string>(this.tokenRefreshUrl, token, this.httpOptions).pipe(
      tap(resp => {
        this.doRefreshToken(resp);
      }),
      mapTo(true),
      catchError(error => {
        console.log('token refresh erro');
        return of(false);
      })
    );
  }

  private doLoginUser(token: Token) {
    this.isUserLoggedIn = true;
    this.storeAuthToken(token);
  }

  private doRefreshToken(token: any) {
    this.storeAuthToken(token);
    this.isUserLoggedIn = true;
  }

  private storeAuthToken(token: Token) {
    localStorage.setItem('authToken', JSON.stringify(token));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isUserLogged() {
    return this.isUserLoggedIn;
  }

  changeLoginStatus(status: boolean) {
    this.isUserLoggedIn = status;
  }
}
