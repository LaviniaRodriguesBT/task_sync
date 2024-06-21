import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {Event} from "../../domain/model/event.model";

@Injectable({
  providedIn: 'root'
})
export class EventReadService {

  constructor(private http: HttpClient) { }

  findById(id: string): Promise<Event>{
    return firstValueFrom(this.http.get<Event>(`http://localhost:3000/event/${id}`));
  }

  findByName(name: string): Promise<Event[]> {
    return firstValueFrom(this.http.get<Event[]>(`http://localhost:3000/event?name=${name}`));
  }

  findAll(): Promise<Event[]>{
    return firstValueFrom(this.http.get<Event[]>('http://localhost:3000/event'));
  }
}