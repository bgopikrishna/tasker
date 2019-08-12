import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { appRoutes } from './routerConfig';
import { SigninComponent } from './components/signin/signin.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/HttpInterceper';
import { UserTasksComponent } from './components/user-tasks/user-tasks.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CreateTodoComponent,
    NavbarComponent,
    TodoListComponent,
    LayoutComponent,
    NotificationsComponent,
    SigninComponent,
    UserTasksComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    CommonModule,

    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
