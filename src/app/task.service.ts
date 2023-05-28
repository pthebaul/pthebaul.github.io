import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Task } from './task';
import { TASKS } from './mock-tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = 'api/tasks';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/type' })
  };

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
      .pipe(catchError(this.handleError<Task[]>('getTasks', [])));
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put(this.tasksUrl, task, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateTask')));
  }

  handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    }
  }
}
