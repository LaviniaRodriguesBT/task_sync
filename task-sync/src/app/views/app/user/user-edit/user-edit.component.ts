import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../../domain/model/user.model';
import { UserReadService } from '../../../../services/user/user-read.service';
import { UserUpdateService } from '../../../../services/user/user-update.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'user-sync-user-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  @ViewChild('imagePreview') imagePreview!: ElementRef<HTMLImageElement>;
  @ViewChild('imgUser') imgUser!: ElementRef<HTMLInputElement>;
  @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;
  userId?: string;
  form!: FormGroup;
  nameMinLength: number = 3;
  emailMinLength: number = 15;
  addressMinLength: number = 10;
  passwordMinLength: number = 6;
  descriptionMinValue: number = 3;
  showPassword: boolean = false
  selectedImage: File | null = null;
  fileName: string = 'Nenhum arquivo escolhido';
  showImagePreview: boolean = false;
  image!: string;
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
      email: ['', [Validators.required, Validators.minLength(this.emailMinLength), Validators.maxLength(200)]],
      password: ['', [Validators.required, Validators.minLength(this.passwordMinLength), Validators.maxLength(20)]],
      cpf: ['', [Validators.required, this.cpfValidator]],
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(200)]],
      address: ['', [Validators.required, Validators.minLength(this.addressMinLength), Validators.maxLength(200)]],
      phone: ['', [Validators.required, this.phoneValidator]],
      access_type: ['', [Validators.required]],
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
    const img = document.getElementById('image-preview') as HTMLImageElement;
    if (img && user.image) {
      this.image = user.image;
      img.src = user.image;
      img.style.display = 'block';
    }
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
    if (this.imgUser) {
      this.imgUser.nativeElement.click();
    } else {
      console.error('Elemento com ID "img-user" não encontrado.');
    }
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
        image: this.image,
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
    return this.form.valid;
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