import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from "../../domain/model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserUpdateService {

  constructor(private http: HttpClient) { }

  async update(user: User) {
    console.log(`atualizando o user...`);
    console.log(user);
    return await firstValueFrom(this.http.put(`http://localhost:8080/api/user/${user.id}`, user));
  }
}
