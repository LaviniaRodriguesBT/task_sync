import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Scheduling } from '../../domain/model/scheduling.model';
@Injectable({
  providedIn: 'root'
})
export class SchedulingUpdateService {
  constructor(private http: HttpClient) { }
  async update(scheduling: Scheduling) {

    console.log(scheduling);
    return await firstValueFrom(this.http.put(`http://localhost:8080/api/event/scheduling/${scheduling.id}`, scheduling));
  }
}