import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.css']
})
export class TaskListItemComponent {
  @Input() task?: Task;
  @Output() refresh = new EventEmitter<number>();

  constructor(private taskService: TaskService) {}

  stateChange(event: Event) {
    if (this.task) {
      const id = this.task.id;
      const test: boolean = (<HTMLInputElement> event.target).checked;
      this.task.isDone = test;
      this.taskService.updateTask(this.task)
        .subscribe(task => {
          if (this.task) { this.task.order = task.order; }
          this.refresh.emit();
        });
    }
  }
}
