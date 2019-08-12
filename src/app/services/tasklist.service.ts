import { Injectable } from '@angular/core';
import { TaskItem } from '../models/todoItem';
import { catchError, map, tap, mapTo } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TasklistService {
  //Http options
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  //GetAndAddtasks url
  private getAndAddTasksUrl = 'http://localhost:8000/api/create-task/';

  todoItems: TaskItem[];
  constructor(private http: HttpClient) {}

  /**
   *  A method Get the list of tasks from the server
   */
  getTasks(): Observable<boolean> {
    return this.http.get<TaskItem[]>(this.getAndAddTasksUrl).pipe(
      tap(tasks => {
        this.todoItems = tasks;
      }),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      })
    );
  }

  /**
   * A method to add task to the database
   * @param task - Task which needs to be added in the database
   */
  addTask(task: TaskItem): Observable<boolean> {
    return this.http
      .post<TaskItem>(this.getAndAddTasksUrl, task, this.httpOptions)
      .pipe(
        tap(tasks => {
          console.log('success');
        }),
        mapTo(true),
        catchError(() => {
          alert('Error Adding Task');
          return of(false);
        })
      );
  }
}
