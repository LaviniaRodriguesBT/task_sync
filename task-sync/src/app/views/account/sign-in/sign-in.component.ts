import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredential } from '../../../domain/dto/user-credential';
import { AuthenticationService } from '../../../services/authentication.service';
import { ToastrService } from "ngx-toastr";
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'task-sync-sign-in',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,

  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {

  email = new FormControl(null);
  password = new FormControl(null, [
    Validators.minLength(1), Validators.maxLength(10)
  ]);

  accessType = new FormControl();

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
    let credential: UserCredential = {
      id: "",
      email: this.email.value!,
      password: this.password.value!,
      accessType: this.accessType.value
    };

    try {
      let id = await this.authenticationService.authenticate(credential);

      credential.id = id;

      this.authenticationService
        .addCredentialsToLocalStorage(credential);

      if (this.accessType.value == "adm") {
        await this.router.navigate(['/']);
        return;
      }if (this.accessType.value == "colab") {
          await this.router.navigate(['/event/list']);
          return;
      }
      await this.router.navigate(['/']);

      this.authenticationService.addCredentialsToLocalStorage(credential);
      localStorage.setItem('accessType', this.accessType.value);

    } catch (e: any) {
      console.error(`erro: ${e}`);
      this.toastrService.error(e.message);
      this.password.setValue(null);
    }
  }

  isFormInvalid() {

    let isValid = this.email.valid && this.password.valid;
    return isValid ? false : true;
  }

}
