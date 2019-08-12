import { Routes } from '@angular/router';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuard } from './auth.guard';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { UserTasksComponent } from './components/user-tasks/user-tasks.component';

export const appRoutes: Routes = [
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: CreateTodoComponent,
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
  {
    path: 'tasks',
    component: TodoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'usertasks',
    component: UserTasksComponent,
    canActivate: [AuthGuard],
  },
];
