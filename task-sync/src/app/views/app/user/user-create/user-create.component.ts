import { Component, OnInit } from '@angular/core';
import { User } from '../../../../domain/model/user.model';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserCreateService } from '../../../../services/user/user-create.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'task-sync-user-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})

export class UserCreateComponent implements OnInit {

  form!: FormGroup;

  nameMinLength: number = 3;
  nameMaxLength: number = 10;


  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private userCreateService: UserCreateService) {

    this.initializeForm();
  }

  ngOnInit(): void {
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      password: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      cpf: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      address: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      phone: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      type_access: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
    });
  }

  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (this.showPassword) {
      passwordField.type = 'text';
    } else {
      passwordField.type = 'password';
    }
  }

  async create() {
    const user: User = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      cpf: this.form.controls['cpf'].value,
      name: this.form.controls['name'].value,
      address: this.form.controls['address'].value,
      phone: this.form.controls['phone'].value,
      access_type: this.form.controls['type_access'].value,
    }

    console.log('preparando para criar a pessoa...');
    console.log(user);

    try {
      await this.userCreateService.createUser(user);
      this.toastr.success('Dados salvos com sucesso!');
      this.router.navigate(['user/list']);
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  async createUser() {
    const user: User = {
      email: this.form.controls['email'].value,
      name: this.form.controls['name'].value,
      password: this.form.controls['password'].value,
      cpf: this.form.controls['cpf'].value,
      phone: this.form.controls['phone'].value,
      address: this.form.controls['address'].value,
      access_type: this.form.controls['type_access'].value,
    }

    console.log('preparando para criar o produto...');
    console.log(user);

    try {
      await this.userCreateService.createUser(user);
      this.toastr.success('Dados salvos com sucesso!');
      this.router.navigate(['scheduling/list']);
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  validateFields() {
    return this.form.controls['email'].valid && 
    this.form.controls['password'].valid && 
    this.form.controls['cpf'].valid && 
    this.form.controls['name'].valid && 
    this.form.controls['address'].valid && 
    this.form.controls['phone'].valid;
  }

}


