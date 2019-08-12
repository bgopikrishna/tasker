import { Injectable } from '@angular/core';
import { catchError, map, tap, mapTo } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  //get the userlist url
  private userlistUrl = 'http://localhost:8000/api/users/';

  userList: User[];

  constructor(private http: HttpClient) {}

  /**
   * A method to get the user list from the server
   */
  getUsers(): Observable<boolean> {
    return this.http.get<User[]>(this.userlistUrl).pipe(
      tap(users => {
        if (users.length !== 0) {
          this.setUserList(users);
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
   * A method to set the userlist with data from the server
   * @param list - user list from the server
   */
  private setUserList(list: User[]) {
    this.userList = list;
  }
}
