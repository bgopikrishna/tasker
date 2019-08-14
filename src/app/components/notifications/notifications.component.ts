import { Component, OnInit, OnDestroy } from '@angular/core';
import { Notification } from '../../models/notification';
import { NotificationService } from 'src/app/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notificationList: Notification[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    //To run the notification service without effecting the performance
    //As the notifications needs to be requested in realtime,  `subscription.unsubscribe()` not used in ngDestroy
    this.runNotificationsFetcher();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private runNotificationsFetcher() {
    setInterval(() => {
      this.subscription.add(
        this.notificationService
          .getNotifications()
          .subscribe((success: boolean) => {
            if (success) {
              this.notificationList = this.notificationService.notifications;
            }
          })
      );
    }, 1000);
  }
}
