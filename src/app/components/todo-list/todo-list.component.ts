import { Component, OnInit } from '@angular/core';
import { TodoItem } from 'src/app/models/todoItem';
import { TasklistService } from 'src/app/services/tasklist.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  constructor(private taskListService: TasklistService) {}

  todoItems: TodoItem[];

  ngOnInit(): void {
    this.taskListService
      .getTasks()
      .subscribe(todos => (this.todoItems = todos));
  }

  onAddTodo(todoItem: TodoItem): void {
    this.taskListService.addTask(todoItem);
    console.log(this.todoItems);
  }

  // deleteTodo($event, id: number | string) {
  //   const newTodos = this.todoItems.filter(todoItem => todoItem.id !== id);
  //   this.todoItems = newTodos;
  // }

  // changeTodoStatus($event, id: number | string) {
  //   const newTodos = this.todoItems.map(todoItem => {
  //     if (todoItem.id === id) {
  //       todoItem.completed = !todoItem.completed;
  //     }

  //     return todoItem;
  //   });
  // }
}
