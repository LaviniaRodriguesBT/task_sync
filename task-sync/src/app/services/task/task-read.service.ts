import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Task } from '../../domain/model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskReadService {

  constructor(private http: HttpClient) { }

  // CRUD - creat delete update

  findById(id: string): Promise<Task>{
    return firstValueFrom(this.http.get<Task>(`http://localhost:3000/task/${id}`));
  }

  findByName(name: string): Promise<Task[]> {
    return firstValueFrom(this.http.get<Task[]>(`http://localhost:3000/task?name=${name}`));
  }

  findAll(): Promise<Task[]>{
    return firstValueFrom(this.http.get<Task[]>('http://localhost:3000/task'));
  }
};