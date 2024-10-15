import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { User } from '../../../../domain/model/user.model';
import { UserReadService } from '../../../../services/user/user-read.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserCredential } from '../../../../domain/dto/user-credential';

@Component({
  selector: 'task-sync-user-detail',
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
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {

  userInformation?: User;
  showPassword: boolean = false;

  selectedImage: File | null = null;
  fileName: string = 'Nenhum arquivo escolhido';
  showImagePreview: boolean = false;
  image!: string;

  constructor(private route: ActivatedRoute,
    private userReadSevice: UserReadService) { }

  ngOnInit(): void {
    let userId = this.route.snapshot.paramMap.get('id');
    console.log(`ID da pessoa: ${userId}`);
    this.loadUserById(userId!);
  }

  onImageSelected(user : any) {
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

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    if (this.showPassword) {
      passwordField.type = 'text';
    } else {
      passwordField.type = 'password';
    }
  }

  async loadUserById(userId: string) {
    let user = await this.userReadSevice.findById(userId);
    console.log(user);
    this.userInformation = user;
  }
}