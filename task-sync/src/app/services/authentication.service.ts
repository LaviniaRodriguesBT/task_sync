import { Injectable } from '@angular/core';
import { UserCredential } from '../domain/dto/user-credential';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  authenticate(credencial: UserCredential): Observable<any> {
    console.log('trying to authenticate...');
    console.log(credencial);
    
   return this.http.get('http://localhost:3000/user/1');

  }

  logout(){
    localStorage.clear();
  }
  //quando der logout limpa o cache

  isAuthenticated(): boolean{
    let token = localStorage.getItem('token');

    if(token != null){
      return true;
    }
    return false;
  }
  //verifica se a informação existe no cache

  addCredentialsToLocalStorage(email: string){
    localStorage.setItem('email', email);
    localStorage.setItem('token', new Date().toLocaleTimeString());
  }
  // adiciona informações no cache
}
