import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventCreateService {

  constructor(private http: HttpClient) { }

  async create(event: Event){
    return firstValueFrom(this.http.post('http://localhost:3000/event', event))
  }
}


