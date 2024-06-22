import { Component, OnInit } from '@angular/core';
import { User } from '../../../../domain/model/user.model';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserCreateService } from '../../../../services/user/user-create.service';

@Component({
  selector: 'task-sync-user-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
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
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],

    });
  }

  async create() {
    const user: User = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      cpf: this.form.controls['cpf'].value,
      name: this.form.controls['name'].value,
      address: this.form.controls['address'].value,
      phone: this.form.controls['phone'].value,

    }

    console.log('preparando para criar a pessoa...');
    console.log(user);

    try {
      await this.userCreateService.create(user);
      this.toastr.success('Dados salvos com sucesso!');
      this.router.navigate(['user/list']);
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  validateFields() {
    return this.form.controls['email'].valid && this.form.controls['password'].valid && this.form.controls['cpf'].valid && this.form.controls['name'].valid && this.form.controls['address'].valid && this.form.controls['phone'].valid;
  }

}


