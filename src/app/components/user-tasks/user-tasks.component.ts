import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { TaskItem } from 'src/app/models/todoItem';
import { TasklistService } from 'src/app/services/tasklist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.scss'],
})
export class UserTasksComponent implements OnInit, OnDestroy {
  currentUserId: number;
  usersList: User[];
  tasks: TaskItem[];

  private subscription: Subscription = new Subscription();

  constructor(
    private userService: UsersService,
    private taskListService: TasklistService
  ) {}

  ngOnInit() {
    //Get the userslist from the server
    this.subscription.add(
      this.userService.getUsers().subscribe((success: boolean) => {
        if (success) {
          this.usersList = this.userService.userList;
        }
      })
    );
    //Get the tasklist from the server
    this.subscription.add(
      this.taskListService.getTasks().subscribe(sucess => {
        if (sucess) {
          this.tasks = this.taskListService.todoItems;
        }
      })
    );
  }

  ngOnDestroy() {
    //unsubscribe from all subscrptions to avoid memory leak
    this.subscription.unsubscribe();
  }

  public trackByfn(index: number): number {
    return index;
  }

  selectUser(e: any) {
    const userId = parseInt(e.target.value);
    this.currentUserId = userId;
  }
}
