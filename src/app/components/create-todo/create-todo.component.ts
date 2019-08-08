import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { TodoItem } from 'src/app/models/todoItem';
import uuid from 'uuid';
import { FlatpickrOptions } from 'ng2-flatpickr';
import M from 'materialize-css';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {
  @Output() addTaskEvent = new EventEmitter<any>();

  todoItem: TodoItem = {
    id: 0,
    todo: '',
    assignedTo: '',
    completed: false,
  };

  dateTimeOptions: FlatpickrOptions = {
    defaultDate: '2017-03-15',
  };

  constructor() {}

  ngOnInit() {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.datepicker');
      var instances = M.Datepicker.init(elems, {});
    });
  }

  onFormSubmit = (e: any) => {
    e.preventDefault();

    const { todo } = this.todoItem;

    if (todo) {
      const uniqid = uuid.v4();
      const todoWithId = { ...this.todoItem, id: uniqid };
      this.addTaskEvent.emit(todoWithId);

      setTimeout(() => e.target.reset(), 300);
    } else {
      alert("Todo Can't be empty");
    }
  };

  manageTodoAssignMemt(e) {
    const assignedTo = e.target.value;
    this.todoItem = { ...this.todoItem, assignedTo };
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    document.removeEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.datepicker');
      var instances = M.Datepicker.init(elems, {});
    });
  }
}
