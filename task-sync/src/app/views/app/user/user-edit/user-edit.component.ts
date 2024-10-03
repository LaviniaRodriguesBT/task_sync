import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../../domain/model/user.model';
import { UserReadService } from '../../../../services/user/user-read.service';
import { UserUpdateService } from '../../../../services/user/user-update.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'user-sync-user-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {

  userId?: string;
  form!: FormGroup;


  nameMinLength: number = 3;
  nameMaxLength: number = 10;
  priceMinValue: number = 1;
  priceMaxValue: number = 500;
  showPassword: boolean = false

  constructor(private activatedRoute: ActivatedRoute,
    private userReadService: UserReadService,
    private userUpdateService: UserUpdateService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      password: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      cpf: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      phone: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      address: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      access_type: ['', [Validators.required ]],
    });
  }

  ngOnInit(): void {
    let userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.userId = userId!;
    this.loadUserById(userId!);
  }

  async loadUserById(userId: string) {
    let user = await this.userReadService.findById(userId);
    console.log(user);
    this.form.controls['name'].setValue(user.name);
    this.form.controls['email'].setValue(user.email);
    this.form.controls['password'].setValue(user.password);
    this.form.controls['cpf'].setValue(user.cpf);
    this.form.controls['phone'].setValue(user.phone);
    this.form.controls['address'].setValue(user.address);
    this.form.controls['access_type'].setValue(user.access_type);
  }

  async update() {
    try {
      const user: User = {
        id: this.userId!,
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value,
        cpf: this.form.controls['cpf'].value,
        name: this.form.controls['name'].value,
        phone: this.form.controls['phone'].value,
        address: this.form.controls['address'].value,
        access_type: this.form.controls['access_type'].value,
      }

      console.log(user);
      await this.userUpdateService.update(user);
      this.toastrService.success('Atividade atualizada com sucesso!');
      this.router.navigate(['user/list']);
    } catch (error) {
      this.toastrService.error('Erro. Atividade não foi atualizada.');
    }
  }

  validateFields() {
    return this.form.controls['name'].valid;
  }

  
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (this.showPassword) {
      passwordField.type = 'text';
    } else {
      passwordField.type = 'password';
    }
  }

}


