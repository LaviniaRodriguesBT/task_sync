import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDeleteService {

  constructor(private http: HttpClient) { }

  delete(id: string){
    return firstValueFrom(this.http.delete(`http://localhost:3000/user/${id}`));
  }

}  