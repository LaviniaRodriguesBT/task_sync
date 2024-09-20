import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../domain/model/user.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCreateService {

  constructor(private http: HttpClient) { }

  async createUser(user: User){
    return firstValueFrom(this.http.post('http://localhost:8080/api/user', user))
  }
}