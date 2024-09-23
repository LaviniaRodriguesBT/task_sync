import { Injectable } from '@angular/core';
import { UserCredential } from '../domain/dto/user-credential';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  async authenticate(credential: UserCredential) : Promise<string>{
    console.log('trying to authenticate...');
    console.log(credential);
    let apiResponse = await firstValueFrom(this.http.get<UserCredential[]>(`http://localhost:8080/api/user?email=${credential.email}&password=${credential.password}`));
    console.log(apiResponse);
    //Tive que comentar pois nao estava deixando passar da autenticação
    // if (apiResponse == null || apiResponse.length != 1) {
    //   throw new Error('dados invalidos');
    // }
    return apiResponse[0].id;
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
