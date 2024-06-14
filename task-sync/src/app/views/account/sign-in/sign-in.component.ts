import { Component, OnInit } from '@angular/core';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredential } from '../../../domain/dto/user-credential';
import { AuthenticationService } from '../../../services/authentication.service';


@Component({
  selector: 'task-sync-sign-in',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{
  email = new FormControl(null);
  password = new FormControl(null, [Validators.minLength(1), Validators.maxLength(10)]);

  isLoginIncorrect = false;

  constructor(private router : Router, private authenticationServices: AuthenticationService) {}
  
  ngOnInit(): void {
    this.loginIfCredentialsIsValid();
  }

  loginIfCredentialsIsValid(){
    if(this.authenticationServices.isAuthenticated()){
      this.router.navigate(['/']);
      return;
    }
  }

  login() {
    let credencial: UserCredential = {
      email: this.email.value!,
      password: this.password.value!
    };

    console.log(credencial);

    this.authenticationServices
    .authenticate(credencial) //autentifica no sistema
    .subscribe(
      {
        // a partir deste ponto já está verificado no sistema
        next: (value) => {
          console.log(value);

          if(!value){
            return;
          } //se passar deste item as informações estão corretas

          this.authenticationServices
          .addCredentialsToLocalStorage(credencial.email); //adiciona o email no cache
          
          this.router.navigate(['/']); //antes de realizar a navegação vai disparar que tem alguém tentando acessar no app.routes.ts no no authentication
        },
        error: (err) => {
          console.error(err);
        }

      }
    );
  }

  isFormInvalid(){
    let isValid = this.email.valid && this.password.valid;
    return isValid ? false : true;
  }
}
