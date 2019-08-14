import { Injectable } from '@angular/core';
import { TaskItem } from '../models/todoItem';
import { catchError, tap, mapTo } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { SyncService } from './sync.service';

@Injectable({
  providedIn: 'root',
})
export class TasklistService {
  //GetAndAddtasks Endpoint
  private getAndAddTasksEndpoint: string = 'api/create-task/';

  todoItems: TaskItem[];

  constructor(private syncService: SyncService) {}

  /**
   *  A method Get the list of tasks from the server
   */
  getTasks(): Observable<boolean> {
    return this.syncService.syncGet(this.getAndAddTasksEndpoint).pipe(
      tap(tasks => {
        this.todoItems = tasks.sort(
          (a: TaskItem, b: TaskItem): any => {
            const dateA: any = new Date(a.created_date);
            const dateB: any = new Date(b.created_date);
            return dateB - dateA;
          }
        );
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
    return this.syncService.syncPost(this.getAndAddTasksEndpoint, task).pipe(
      tap(task => {
        console.log('Task added successfully:', task);
      }),
      mapTo(true),
      catchError(() => {
        alert('Error Adding Task');
        return of(false);
      })
    );
  }
}
