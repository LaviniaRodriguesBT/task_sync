import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Task } from '../../domain/model/task.model';
@Injectable({
  providedIn: 'root'
})
export class TaskReadService {
  constructor(private http: HttpClient) { }
  findById(id: string): Promise<Task>{
    return firstValueFrom(this.http.get<Task>(`http://localhost:8080/api/task/${id}`));
  }
  findByName(name: string): Promise<Task[]> {
    return firstValueFrom(this.http.get<Task[]>(`http://localhost:8080/api/task?name=${name}`));
  }
  findAll(): Promise<Task[]>{
    return firstValueFrom(this.http.get<Task[]>('http://localhost:8080/api/task'));
  }
};