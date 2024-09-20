import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Task } from '../../domain/model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskUpdateService {

  constructor(private http: HttpClient) { }

  async update(task: Task) {
    console.log(`atualizando a atividade...`);
    console.log(task);
    return await firstValueFrom(this.http.put(`http://localhost:8080/api/task/${task.id}`, task));
  }
}
