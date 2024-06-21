import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Scheduling } from '../../domain/model/scheduling.model';

@Injectable({
  providedIn: 'root'
})
export class SchedulingCreateService {

  constructor(private http: HttpClient) { }

  async create(scheduling: Scheduling){
    return firstValueFrom(this.http.post('http://localhost:3000/scheduling', scheduling))
  }
}