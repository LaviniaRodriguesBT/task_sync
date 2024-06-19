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
export class SignUpComponent implements OnInit{

  form!: FormGroup;

  fullNameMinLength: number = 2;
  fullNameMaxLength: number = 10;
  passwordMinLength: number = 2;
  passwordMaxLength: number = 10;

  constructor(private formBuilder: FormBuilder, 
              private createUserService: UserCreateService, 
              private router: Router){
    this.initializeForm();
  }
  
  ngOnInit(): void {
    
  }

  initializeForm(){
    this.form =  this.formBuilder.group({
      email: ['', [
        Validators.required, //obrigatório
        Validators.email,
      ]],
      name: ['', [
        Validators.required, //obrigatório
        Validators.minLength(this.fullNameMinLength),
        Validators.maxLength(this.fullNameMaxLength),
      ]],
      password: ['', [
        Validators.required, //obrigatório
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.passwordMaxLength),
      ]],
      cpf: ['', [
        Validators.required, //obrigatório
        Validators.minLength(this.fullNameMinLength),
        Validators.maxLength(this.fullNameMaxLength),
      ]],
      address: ['', [
        Validators.required, //obrigatório
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.passwordMaxLength),
      ]],
      repeatPassword: ['', [
        Validators.required, //obrigatório
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.passwordMaxLength),
      ]],
    });
  }

  // fullName = new FormControl(null, [
  //   Validators.minLength(3),
  //   Validators.maxLength(10),
  // ]);

  // email = new FormControl(null, Validators.email);

  // password = new FormControl(null, [
  //   Validators.minLength(3),
  //   Validators.maxLength(10),
  // ]);

  // repeatPassword = new FormControl(null, [
  //   Validators.minLength(3),
  //   Validators.maxLength(10),
  // ]);

  isFormInvalid(){
    // let isValid = this.fullName.valid 
    // && this.email.valid
    // && this.password.valid
    // && this.repeatPassword.valid;

    // if(this.password.value !== this.repeatPassword.value) {
    //   return true;
    // }

    let isValid = this.form.controls['fullName'].valid
    && this.form.controls['email'].valid
    && this.form.controls['password'].valid
    && this.form.controls['repeatPassword'].valid;

    if(this.form.controls['password'] != null &&
       this.form.controls['repeatPassword'] != null &&
       this.form.controls['password'].value !== this.form.controls ['repeatPassword'].value) {
      return true;
    }
    return isValid ? false : true;
  }

  createAccount(){
    console.log("Criando conta...")

    let user: User = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      cpf: this.form.controls['cpf'].value,
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

  arePasswordsValid(){
    return this.form.controls['password'].value === this.form.controls['repeatPassword'].value;
  }
}
