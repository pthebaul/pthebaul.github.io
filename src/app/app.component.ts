import { Component } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo list';
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  private compareTasks(left: Task, right: Task) {
    const compareIsDone = (left.isDone === right.isDone) ? 0 : (left.isDone ? 1 : -1);
    return compareIsDone || left.id - right.id;
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks.sort(this.compareTasks);
    });
  }

  refreshList(): void {
      this.tasks.sort(this.compareTasks);
  }
}
