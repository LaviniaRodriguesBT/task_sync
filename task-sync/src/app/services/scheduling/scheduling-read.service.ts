import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Scheduling } from '../../domain/model/scheduling.model';
import { SchedulingUser } from '../../domain/model/scheduling_user.model';
import { ResponseScheduling } from '../../domain/dto/response-scheduling';
@Injectable({
  providedIn: 'root'
})
export class SchedulingReadService {
  constructor(private http: HttpClient) { }
  findById(id: string): Promise<ResponseScheduling>{
    return firstValueFrom(this.http.get<ResponseScheduling>(`http://localhost:8080/api/event/scheduling/${id}`));
  }
  findByEventId(id: string): Promise<ResponseScheduling[]>{
    return firstValueFrom(this.http.get<ResponseScheduling[]>(`http://localhost:8080/api/event/scheduling/list-scheduling-by-event?event_id=${id}`));
  }
  findByName(name: string): Promise<Scheduling[]> {
    return firstValueFrom(this.http.get<Scheduling[]>(`http://localhost:8080/api/event/scheduling?name=${name}`));
  }
  findAll(): Promise<ResponseScheduling[]>{
    return firstValueFrom(this.http.get<ResponseScheduling[]>('http://localhost:8080/api/event/scheduling'));
  }
}