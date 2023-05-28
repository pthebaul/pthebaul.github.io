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

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks.sort((left, right) => (left === right)? 0 : left? 1 : -1);
    });
  }
}
