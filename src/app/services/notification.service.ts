import { Injectable } from '@angular/core';
import { catchError, map, tap, mapTo } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Notification } from '../models/notification';

/**
 * A notification service to get the notifations from the server
 */

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsUrl = 'http://localhost:8000/notifications/';

  notifications: Notification[] = [];

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<boolean> {
    return this.http.get<Notification[]>(this.notificationsUrl).pipe(
      tap(notifications => {
        if (notifications.length !== 0) {
          //Set Notifications from the server
          this.setNotificationsList(notifications);
        }
      }),
      mapTo(true),
      catchError(error => {
        console.trace('error');
        return of(false);
      })
    );
  }

  /**
   * set the notifiactions return from the server
   * @param notifications - notifications array
   */
  private setNotificationsList(notifications: Notification[]): void {
    this.notifications = notifications;
  }
}
