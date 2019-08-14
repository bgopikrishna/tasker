import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskItem } from 'src/app/models/todoItem';
import { TasklistService } from 'src/app/services/tasklist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  private subsciprtion: Subscription = new Subscription();

  todoItems: TaskItem[];

  constructor(private taskListService: TasklistService) {}

  ngOnInit(): void {
    //Subscribing to the task Items from the server
    this.subsciprtion.add(
      this.taskListService.getTasks().subscribe(sucess => {
        if (sucess) {
          //Set the `todoItems` from `tasklistService`
          this.todoItems = this.taskListService.todoItems;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subsciprtion.unsubscribe();
  }
}
