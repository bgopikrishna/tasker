import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { TodoItem, TaskItem } from 'src/app/models/todoItem';
import uuid from 'uuid';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { TasklistService } from 'src/app/services/tasklist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  addTaskForm: FormGroup; //Form Control
  usersList: User[]; //Users list

  //Date Picker default Options
  dateTimeOptions: FlatpickrOptions = {
    defaultDate: new Date().toDateString(),
  };

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private taskListService: TasklistService,
    private router: Router
  ) {}

  ngOnInit() {
    //Setting the form
    this.addTaskForm = this.formBuilder.group({
      title: [''],
      remainder_date: [''],
      remind_to: [''],
    });

    //Get users list

    this.subscription.add(
      this.userService.getUsers().subscribe(success => {
        if (success) {
          this.usersList = this.userService.userList;
        }
      })
    );
  }

  //Get the data from the form
  getFormData() {
    return this.addTaskForm.controls;
  }

  /**
   * Add task form handler
   */
  addTask(): void {
    const title: string = this.getFormData().title.value;
    const remainder_date: string = this.getFormData().remainder_date.value;
    const remind_to: number = parseInt(this.getFormData().remind_to.value);

    const task: TaskItem = {
      title,
      remainder_date,
      remind_to,
    };

    this.doAddTask(task);
  }

  /**
   * Adds the task to the database
   * @param task - The task Item Object needs to be stored in the server
   */
  private doAddTask(task: TaskItem) {
    this.subscription.add(
      this.taskListService.addTask(task).subscribe(taskSuccessMessage())
    );
    this.router.navigateByUrl('/tasks');
    //Reset the form after adding the task
    this.addTaskForm.reset();
  }

  ngOnDestroy(): void {
    //Unsubscribe from all subscriptions
    this.subscription.unsubscribe();
  }
}

/**
 * A fuction to let the user know, if the task is added or not.
 */
function taskSuccessMessage(): (value: boolean) => void {
  return success => {
    if (success) {
      alert('Task Added');
    } else alert('Error Adding Task');
  };
}
