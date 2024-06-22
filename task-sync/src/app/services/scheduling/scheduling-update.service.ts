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
    console.log(`atualizando o cronograma...`);
    console.log(scheduling);
    return await firstValueFrom(this.http.put(`http://localhost:3000/scheduling/${scheduling.id}`, scheduling));
  }
}