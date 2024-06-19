import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Task } from '../../domain/model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskCreateService {
  constructor(private http: HttpClient) { }

  async create(task: Task){
    return firstValueFrom(this.http.post('http://localhost:3000/task', task))
  }
}
