import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Notification } from '../models/notification';
import { SyncService } from './sync.service';

/**
 * A notification service to get the notifations from the server
 */

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsUrl: string = 'notifications/';
  // private webSocketUrl: string =
  //   'ws://localhost:80/ws/foobar?subscribe-broadcast&publish-broadcast&echo';

  notifications: Notification[] = [];
  ws: WebSocket;

  constructor(private syncService: SyncService) {}

  /**
   * A method to make request to get notifications from the server
   * @returns {Observable<boolean>}
   */
  getNotifications(): Observable<boolean> {
    // this.setWebsocket();

    return this.syncService.syncGet(this.notificationsUrl).pipe(
      tap(notifications => {
        if (notifications.length !== 0) {
          //Set Notifications from the server
          this.setNotificationsList(notifications);
        }
      }),
      mapTo(true),
      catchError(() => {
        console.trace('error');
        return of(false);
      })
    );
  }

  // setWebsocket = () => {
  //   this.ws = new WebSocket(this.webSocketUrl);

  //   this.ws.onopen = () => {
  //     console.log('Socket started');
  //   };
  // };

  /**
   * set the notififcations returned from the server
   * @param notifications - notifications array
   */
  private setNotificationsList(notifications: Notification[]): void {
    this.notifications = notifications;
  }
}
