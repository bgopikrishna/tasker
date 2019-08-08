import { Injectable, OnInit } from '@angular/core';
import { TodoItem } from '../models/todoItem';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasklistService implements OnInit {
  todoItems: TodoItem[] = mockTodoItems;
  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.todoItems = mockTodoItems;
  }

  getTasks(): Observable<TodoItem[]> {
    return of(this.todoItems);
  }

  addTask(todo: TodoItem): void {
    this.todoItems.push(todo);
  }
}

const mockTodoItems = [
  {
    id: 1,
    todo: 'Add A Task',
    completed: true,
  },
  {
    id: 2,
    todo: 'Check the Task',
    completed: false,
  },
  {
    id: 3,
    todo: 'Delete A Task',
    completed: true,
  },
];
