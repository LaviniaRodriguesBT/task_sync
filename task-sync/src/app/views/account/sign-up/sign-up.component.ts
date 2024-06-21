import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../../domain/model/user.model';
import { UserCreateService } from '../../../services/user/user-create.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'task-sync-sign-up',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {

  form!: FormGroup;

  fullNameMinLength: number = 2;
  fullNameMaxLength: number = 10;
  passwordMinLength: number = 2;
  passwordMaxLength: number = 10;

  constructor(private formBuilder: FormBuilder,
    private createUserService: UserCreateService,
    private router: Router) {
    this.initializeForm();
  }

  ngOnInit(): void {

  }

  initializeForm() {
    this.form = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      name: ['', [
        Validators.required,
        Validators.minLength(this.fullNameMinLength),
        Validators.maxLength(this.fullNameMaxLength),
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.passwordMaxLength),
      ]],
      cpf: ['', [
        Validators.required,
        Validators.minLength(this.fullNameMinLength),
        Validators.maxLength(this.fullNameMaxLength),
      ]],
      address: ['', [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.passwordMaxLength),
      ]],
      repeatPassword: ['', [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.passwordMaxLength),
      ]],
    });
  }


  isFormInvalid() {


    let isValid = this.form.controls['fullName'].valid
      && this.form.controls['email'].valid
      && this.form.controls['password'].valid
      && this.form.controls['repeatPassword'].valid;

    if (this.form.controls['password'] != null &&
      this.form.controls['repeatPassword'] != null &&
      this.form.controls['password'].value !== this.form.controls['repeatPassword'].value) {
      return true;
    }
    return isValid ? false : true;
  }

  createAccount() {
    console.log("Criando conta...")

    let user: User = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      cpf: this.form.controls['cpf'].value,
      phone: this.form.controls['phone'].value,
      name: this.form.controls['name'].value,
      address: this.form.controls['address'].value,
    };

    this.createUserService.create(user)
      .subscribe({
        next: value => {
          console.log(value);
          this.router.navigate(['account/sign-in']);
        },
        error: err => {
          console.error('Erro inesperado');
        }
      });
  }

  arePasswordsValid() {
    return this.form.controls['password'].value === this.form.controls['repeatPassword'].value;
  }
}
