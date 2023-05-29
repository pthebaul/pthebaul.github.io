import { Component } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: Task[] = [];
  newTitle: string = '';
  newDescription: string = '';

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

  addTask(title: string, description: string): void {
    title = title.trim();
    if (!title) { return; }
    description = description.trim();

    this.taskService.addTask({ title, description } as Task)
      .subscribe(task => { this.tasks.push(task); })

    this.newTitle = '';
    this.newDescription = '';
  }

  refreshList(): void {
      this.tasks.sort(this.compareTasks);
  }
}
