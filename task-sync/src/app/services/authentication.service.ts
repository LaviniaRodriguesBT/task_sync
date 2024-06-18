import {Injectable} from '@angular/core';
import {UserCredential} from '../domain/dto/user-credential';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  async authenticate(credential: UserCredential) {
    console.log('trying to authenticate...');
    console.log(credential);

    // return this.http.get('http://localhost:3000/user/1');
    let apiResponse = await firstValueFrom(this.http.get<UserCredential[]>(`http://localhost:3000/user?email=${credential.email}&password=${credential.password}`));
    console.log(apiResponse);
    if (apiResponse == null || apiResponse.length != 1) {
      throw new Error('dados invalidos');
    }
    return true;
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem('token');

    if (token != null) {
      return true;
    }
    return false;
  }

  addCredentialsToLocalStorage(email: string) {
    localStorage.setItem('email', email);
    localStorage.setItem('token', new Date().toLocaleTimeString());
  }


}
