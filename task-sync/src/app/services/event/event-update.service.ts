import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {Event} from "../../domain/model/event.model";

@Injectable({
  providedIn: 'root'
})
export class EventUpdateService {

  constructor(private http: HttpClient) { }

  async update(event: Event) {
    console.log(`atualizando o evento...`);
    console.log(event);
    return await firstValueFrom(this.http.put(`http://localhost:8080/api/event/${event.id}`, event));
  }
}
