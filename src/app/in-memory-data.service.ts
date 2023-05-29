import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions, STATUS, getStatusText } from 'angular-in-memory-web-api';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks = [
      { id: 1, title: "Solve the first two layers", isDone: false, order: 1 },
      { id: 2, title: "Orientate the last layer", isDone: false, order: 2 },
      { id: 3, title: "Permutate the last layer", isDone: false, order: 3 },
      { id: 0, title: "Do a cross", description: "The most simple step", isDone: true, order: 4 }
    ];
    return { tasks };
  }

  get(reqInfo: RequestInfo) {
    console.log('get', reqInfo);
    return undefined;
  }

  post(reqInfo: RequestInfo) {
    var collection = reqInfo.collection;

    if (!collection)
      return reqInfo.utils.createResponse$(() => {
        const options: ResponseOptions = { status: STATUS.NOT_FOUND };
        return this.finishOptions(options, reqInfo);
      });

    let item = reqInfo.utils.getJsonBody(reqInfo.req)
    item["id"] = this.genId(collection);
    item["order"] = this.genNewFirstOrder(collection);
    collection.push(item);

    // respond
    return reqInfo.utils.createResponse$(() => {
      const options: ResponseOptions =
      {
        body: item,
        status: STATUS.OK
      }
      return this.finishOptions(options, reqInfo);
    });
  }

  put(reqInfo: RequestInfo) {
    var collection = reqInfo.collection;

    if (!collection || reqInfo.id === undefined) {
      return reqInfo.utils.createResponse$(() => {
        const options: ResponseOptions = { status: STATUS.NOT_FOUND };
        return this.finishOptions(options, reqInfo);
      });
    }

    let item = <Task> reqInfo.utils.findById(collection, reqInfo.id);
    const body = <Task> reqInfo.utils.getJsonBody(reqInfo.req);
    if (body.isDone && !item.isDone) {
      item.order = this.genNewLastOrder(collection, item);
    }
    item.isDone = body.isDone;
    item.title = body.title;
    item.description = body.description;
    console.log(item);

    // respond
    return reqInfo.utils.createResponse$(() => {
      const options: ResponseOptions =
      {
        body: item,
        status: STATUS.OK
      }
      return this.finishOptions(options, reqInfo);
    });
  }

  private finishOptions(options: ResponseOptions, {headers, url}: RequestInfo) {
    options.statusText = options.status == null ? undefined : getStatusText(options.status);
    options.headers = headers;
    options.url = url;
    return options;
  }

  // Overrides the genId method to ensure that a task always has an id.
  // If the tasks array is empty,
  // the method below returns the initial number (0).
  // if the tasks array is not empty, the method below returns the highest
  // task id + 1.
  genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 0;
  }

  genNewFirstOrder(tasks: Task[]): number {
    return tasks.length > 0 ? Math.min(...tasks.map(task => task.order)) - 1 : 1;
  }

  genNewLastOrder(tasks: Task[], currentTask: Task): number {
    return tasks.length === 0 ? 1 : 1 + Math.max(...tasks
        .filter(task => task !== currentTask)
        .map(task => task.order)
    );
  }
}
