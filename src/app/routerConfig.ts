import { Routes } from '@angular/router';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { SigninComponent } from './components/signin/signin.component';

export const appRoutes: Routes = [
  {
    path: 'notifications',
    component: NotificationsComponent,
  },
  {
    path: 'home',
    component: TodoListComponent,
  },
  {
    path: '',
    component: TodoListComponent,
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
];
