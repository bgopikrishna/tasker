import { Component, OnInit, NgZone } from '@angular/core';
import { Notification } from '../../models/notification';
import { NotificationService } from 'src/app/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notificationList: Notification[] = [];
  private sunscription: Subscription = new Subscription();

  constructor(
    private zone: NgZone,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    //To run the notification service without effecting the performance
    //As the notifications needs to be requested in realtime,  `subscription.unsubscribe()` not used in ngDestroy
    this.runNotificationsFetcher();
  }

  private runNotificationsFetcher() {
    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        this.sunscription.add(
          this.notificationService
            .getNotifications()
            .subscribe(this.setNotificationList())
        );
      }, 1000);
    });
  }

  /*****************   Private Methods  *****************************/

  /**
   * For setting the `notificationList` with the notifications from the server
   */
  private setNotificationList(): (value: boolean) => void {
    return (success: boolean) => {
      if (success) {
        this.notificationList = this.notificationService.notifications;
      }
    };
  }
}
