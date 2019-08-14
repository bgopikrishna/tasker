import { Injectable } from '@angular/core';
import { catchError, tap, mapTo } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { User } from '../models/user';
import { SyncService } from './sync.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  //get the userlist url
  private userlistEndpoint: string = 'api/users/';

  userList: User[];

  constructor(private syncService: SyncService) {}

  /**
   * A method to get the user list from the server
   */
  getUsers(): Observable<boolean> {
    return this.syncService.syncGet(this.userlistEndpoint).pipe(
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
