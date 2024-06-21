import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Scheduling } from '../../domain/model/scheduling.model';

@Injectable({
  providedIn: 'root'
})
export class SchedulingReadService {

  constructor(private http: HttpClient) { }

  findById(id: string): Promise<Scheduling>{
    return firstValueFrom(this.http.get<Scheduling>(`http://localhost:3000/scheduling/${id}`));
  }

  findByName(name: string): Promise<Scheduling[]> {
    return firstValueFrom(this.http.get<Scheduling[]>(`http://localhost:3000/scheduling?name=${name}`));
  }

  findAll(): Promise<Scheduling[]>{
    return firstValueFrom(this.http.get<Scheduling[]>('http://localhost:3000/scheduling'));
  }
}