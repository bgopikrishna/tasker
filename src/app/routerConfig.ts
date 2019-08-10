import { Routes } from '@angular/router';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuard } from './auth.guard';

export const appRoutes: Routes = [
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: TodoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
];
