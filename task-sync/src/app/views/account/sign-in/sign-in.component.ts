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

  accessType = new FormControl(null); // Não preenchemos aqui, será definido via query param

  isLoginIncorrect = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    // Capturar o parâmetro 'accessType' da URL
    this.route.queryParams.subscribe(params => {
      const accessType = params['accessType'];
      if (accessType) {
        this.accessType.setValue(accessType); // Preenche o tipo de acesso com o valor recebido
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
      let id = await this.authenticationService.authenticate(credential);
      credential.id = id;

      this.authenticationService.addCredentialsToLocalStorage(credential);

      if (credential.accessType === "adm") {
        await this.router.navigate(['/']);
      } else if (credential.accessType === "colab") {
        await this.router.navigate(['/event/list']);
      }

      localStorage.setItem('accessType', credential.accessType);

    } catch (e: any) {
      console.error(`erro: ${e}`);
      this.toastrService.error(e.message);
      this.password.setValue(null);
    }
  }

  isFormInvalid() {
    return !this.email.valid || !this.password.valid || !this.accessType.value;
  }
}
