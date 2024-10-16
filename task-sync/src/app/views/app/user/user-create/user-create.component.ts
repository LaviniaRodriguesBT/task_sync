import { Component, OnInit } from '@angular/core';
import { User } from '../../../../domain/model/user.model';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserCreateService } from '../../../../services/user/user-create.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'task-sync-user-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})

export class UserCreateComponent implements OnInit {

  form!: FormGroup;

  nameMinLength: number = 3;

  emailMinLength: number = 15;

  addressMinLength: number = 10;

  passwordMinLength: number = 6;

  descriptionMinValue: number = 3;
  descriptionMaxValue: number = 200;

  selectedImage: File | null = null;
  fileName: string = 'Nenhum arquivo escolhido';
  showImagePreview: boolean = false;
  image!: string;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private userCreateService: UserCreateService,
  ) {

    this.initializeForm();
  }

  ngOnInit(): void {
  }

  initializeForm() {
    this.form = this.formBuilder.group({
        email: ['', [Validators.required, Validators.minLength(this.emailMinLength), Validators.maxLength(200)]],
        password: ['', [Validators.required, Validators.minLength(this.passwordMinLength), Validators.maxLength(20)]],
        cpf: ['', [Validators.required, this.cpfValidator]],
        name: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(200)]],
        address: ['', [Validators.required, Validators.minLength(this.addressMinLength), Validators.maxLength(200)]],
        phone: ['', [Validators.required, this.phoneValidator]], 
        access_type: ['', [Validators.required]],    
    });
}

  validateNumber(event: KeyboardEvent) {
    const charCode = event.keyCode ? event.keyCode : event.which;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); 
    }
  }
  

  cpfValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value || '';
    const cpfPattern = /^[0-9]{11}$/; 
  
    if (!cpfPattern.test(value)) {
      return { invalidCPF: true }; 
    }
    return null; 
  }

  phoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value || '';
    const phonePattern = /^[0-9]{10,11}$/; 
  
    if (!phonePattern.test(value)) {
      return { invalidPhone: true }; 
    }
    return null; 
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
      access_type: this.form.controls['access_type'].value,
      image: this.image,
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

  onImageSelected(user: any) {
    const file = user.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.fileName = file.name;
      this.showImagePreview = true;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = reader.result as string;
        const img = document.getElementById('image-preview') as HTMLImageElement;
        if (img) {
          img.src = e.target?.result as string;
          img.style.display = 'block';
        }
      };
      reader.readAsDataURL(file);
    } else {
      this.fileName = 'Nenhum arquivo escolhido';
      this.showImagePreview = false;
    }
  }

  openImagePicker() {
    const imageInput = document.getElementById('img-user') as HTMLInputElement;
    if (imageInput) {
      imageInput.click();
    } else {
      console.error('Elemento com ID "img-user" não encontrado.');
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


