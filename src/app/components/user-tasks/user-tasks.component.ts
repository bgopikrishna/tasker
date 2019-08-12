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
      this.userService.getUsers().subscribe(this.setUserList())
    );
    //Get the tasklist from the server
    this.subscription.add(
      this.taskListService.getTasks().subscribe(this.setTaskItems())
    );
  }

  ngOnDestroy() {
    //unsubscribe from all subscrptions to avoid memory leak
    this.subscription.unsubscribe();
  }

  /*************************** Private Methods  ********************************/

  /**
   * Set the taskItems from the tasklistService
   */
  private setTaskItems(): (value: boolean) => void {
    return sucess => {
      if (sucess) {
        this.tasks = this.taskListService.todoItems;
      }
    };
  }

  /**
   * Set the userlist
   */
  private setUserList(): (value: boolean) => void {
    return (success: boolean) => {
      if (success) {
        this.usersList = this.userService.userList;
      }
    };
  }

  /**
   *
   * @param index - Trackby index
   */

  public trackByfn(index: number): number {
    return index;
  }

  selectUser(e: any) {
    const userId = parseInt(e.target.value);
    this.currentUserId = userId;
  }
}
