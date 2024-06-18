import {Component, OnInit} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserCredential} from '../../../domain/dto/user-credential';
import {AuthenticationService} from '../../../services/authentication.service';
import {ToastrService} from "ngx-toastr";

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
export class SignInComponent implements OnInit {

  // email = new FormControl(null, Validators.email);
  email = new FormControl(null);
  password = new FormControl(null, [
    Validators.minLength(1), Validators.maxLength(10)
  ]);

  isLoginIncorrect = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private toastrService: ToastrService,) {
  }

  ngOnInit(): void {
    this.loginIfCredentialsIsValid();
  }

  loginIfCredentialsIsValid() {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  async login() {
    // let emailField = this.email.value;
    // let passwordField = this.password.value;
    let credential: UserCredential = {
      email: this.email.value!,
      password: this.password.value!
    };

    // console.log(`email: ${credential.email}`);
    // console.log(`senha: ${credential.password}`);
    // console.log(credential);

    // this.authenticationService
    // .authenticate(credential)
    // .subscribe(
    //   {
    //     next: (value) => {
    //       console.log(value);
    //
    //       if(!value) {
    //         return;
    //       }
    //
    //       this.authenticationService
    //       .addCredentialsToLocalStorage(credential.email);
    //
    //       this.router.navigate(['/']);
    //     },
    //     error: (err) => {
    //       console.error(err);
    //     }
    //   }
    // );
    try {
      await this.authenticationService.authenticate(credential);
      this.authenticationService
        .addCredentialsToLocalStorage(credential.email);

      await this.router.navigate(['/']);
    } catch (e: any) {
      console.error(`erro: ${e}`);
      this.toastrService.error(e.message);
      this.password.setValue(null);
    }
  }

  isFormInvalid() {

    let isValid = this.email.valid && this.password.valid;

    // if(isValid) return false;
    // if(!isValid) return true;

    return isValid ? false : true;
  }

}
