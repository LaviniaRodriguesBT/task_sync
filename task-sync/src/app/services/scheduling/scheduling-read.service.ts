import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Scheduling } from '../../domain/model/scheduling.model';
import { SchedulingUser } from '../../domain/model/scheduling_user.model';

@Injectable({
  providedIn: 'root'
})
export class SchedulingReadService {

  constructor(private http: HttpClient) { }

  findById(id: string): Promise<Scheduling>{
    return firstValueFrom(this.http.get<Scheduling>(`http://localhost:3000/scheduling/${id}`));
  }

  findByEventId(id: string): Promise<SchedulingUser[]>{
    return firstValueFrom(this.http.get<SchedulingUser[]>(`http://localhost:3000/scheduling?event_id=${id}`));
  }

  findByName(name: string): Promise<Scheduling[]> {
    return firstValueFrom(this.http.get<Scheduling[]>(`http://localhost:3000/scheduling?name=${name}`));
  }

  findAll(): Promise<Scheduling[]>{
    return firstValueFrom(this.http.get<Scheduling[]>('http://localhost:3000/scheduling'));
  }
}