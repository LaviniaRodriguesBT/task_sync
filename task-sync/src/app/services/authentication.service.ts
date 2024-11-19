import { Injectable } from '@angular/core';
import { UserCredential } from '../domain/dto/user-credential';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from '../domain/model/user.model';
import { JwtTokenDto } from '../domain/dto/jwttokendto';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) {
  }
  async authenticate(credential: UserCredential) : Promise<JwtTokenDto>{
    console.log('trying to authenticate...');
    console.log(credential);
    let apiResponse = await firstValueFrom(this.http.post<JwtTokenDto>(`http://localhost:8080/authenticate`, credential));
    localStorage.setItem('token', apiResponse.token);
    return apiResponse;
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
  addCredentialsToLocalStorage(credential: UserCredential) {
    localStorage.setItem('email', credential.email);
    localStorage.setItem('id', credential.id);
    localStorage.setItem('token', new Date().toLocaleTimeString());
    localStorage.setItem('accessType', credential.accessType);
  }
}
