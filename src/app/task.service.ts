import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = 'localhost:9000/tasks';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/type' })
  };

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
      .pipe(catchError(this.handleError<Task[]>('getTasks', [])));
  }

  getTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url)
      .pipe(catchError(this.handleError<Task>(`getTask id=${id}`)));
  }

  updateTask(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}/${task.id}`;
    return this.http.put<Task>(url, task, this.httpOptions)
      .pipe(catchError(this.handleError<Task>(`updateTask id=${task.id}`)));
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions)
      .pipe(catchError(this.handleError<Task>('addTask')));
  }

  handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    }
  }
}
