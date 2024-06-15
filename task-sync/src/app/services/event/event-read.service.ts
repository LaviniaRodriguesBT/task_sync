import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Events } from '../../views/app/event/event-list/event-list.component';

@Injectable({
  providedIn: 'root'
})
export class EventsReadService {

  constructor(private http: HttpClient) { }

  // CRUD - creat delete update

  findById(id: string): Promise<Events>{
    return firstValueFrom(this.http.get<Events>(`http://localhost:3000/Events/${id}`));
  }

  findByName(name: string): Promise<Events[]> {
    return firstValueFrom(this.http.get<Events[]>(`http://localhost:3000/Events?name=${name}`));
  }

  findAll(): Promise<Events[]>{
    return firstValueFrom(this.http.get<Events[]>('http://localhost:3000/Events'));
  }
};