import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../../domain/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserReadService {

  constructor(private http: HttpClient) { }

  // CRUD - creat delete update

  findById(id: string): Promise<User>{
    return firstValueFrom(this.http.get<User>(`http://localhost:3000/user/${id}`));
  }

  findByName(name: string): Promise<User[]> {
    return firstValueFrom(this.http.get<User[]>(`http://localhost:3000/user?name=${name}`));
  }

  findAll(): Promise<User[]>{
    return firstValueFrom(this.http.get<User[]>('http://localhost:3000/user'));
  }
}