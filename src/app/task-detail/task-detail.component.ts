import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent {
  notFound: boolean = false;
  task?: Task;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.getTask();
  }

  getTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(id)
      .subscribe(task => {
        this.task = task;
        this.notFound = (task === undefined)
      });
  }
}
