import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserCredential } from '../../../domain/dto/user-credential';
import { AuthenticationService } from '../../../services/authentication.service';
import { ToastrService } from "ngx-toastr";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { User } from '../../../domain/model/user.model';
import SystemConstants from '../../../domain/constants/systemconstants';
import { JwtTokenDto } from '../../../domain/dto/jwttokendto';
import { TokenDecoder } from '../../../util/tokendecoder';

@Component({
  selector: 'task-sync-sign-in',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  email = new FormControl(null);
  password = new FormControl(null, [
    Validators.minLength(1), Validators.maxLength(10)
  ]);
  accessType = new FormControl(null);
  isLoginIncorrect = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private toastrService: ToastrService,
  ) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const accessType = params['accessType'];
      if (accessType) {
        this.accessType.setValue(accessType);
      }
    });
    this.loginIfCredentialsIsValid();
  }
  loginIfCredentialsIsValid() {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }
  async login() {
    if (this.isFormInvalid()) {
      this.toastrService.error('Preencha todos os campos corretamente');
      return;
    }
    let credential: UserCredential = {
      id: "",
      email: this.email.value!,
      password: this.password.value!,
      accessType: this.accessType.value!
    };
    try {
      let token: JwtTokenDto = await this.authenticationService.authenticate(credential);

      
      if(token == null){
        this.toastrService.error("Usuario não encontrado");
        return;
      }

      let tokeninfo = TokenDecoder.getDecodedAccessToken(token.token);
      console.log (tokeninfo);

      if(tokeninfo.role != credential.accessType.toLocaleUpperCase()){
        this.toastrService.error("O tipo do usuario incorreto");
        return;
      }
      this.authenticationService.addCredentialsToLocalStorage(tokeninfo, token.token);
      console.log(credential.accessType)
      
      if (tokeninfo.role === SystemConstants.USER_TYPES.ADM) {
        console.log(credential.accessType)

    
        await this.router.navigate(['/']);
      } else if (tokeninfo.role === SystemConstants.USER_TYPES.COLAB) {
        await this.router.navigate(['/event/list']);
      }
      localStorage.setItem('accessType', tokeninfo.role);
    } catch (e: any) {
      console.error(`erro: ${e}`);
      this.toastrService.error('Usuário ou Senha inválido.');
      this.password.setValue(null);
    }
  }
  isFormInvalid() {
    return !this.email.valid || !this.password.valid || !this.accessType.value;
  }
}
