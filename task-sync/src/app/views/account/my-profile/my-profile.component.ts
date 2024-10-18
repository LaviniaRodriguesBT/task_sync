import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserReadService } from '../../../services/user/user-read.service';
@Component({
  selector: 'task-sync-my-profile',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {

  accessType: string | null = null;
  access_type: string | null = '';
  email: string | null = '';

  form!: FormGroup;

  activatedRoute: any;
  userId: any;
  image: any;

  constructor(
    private formBuilder: FormBuilder,
    private userReadService: UserReadService,
  ) {
    this.initializeForm();
  }


  initializeForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(200)]],
      name: ['', [Validators.required, Validators.maxLength(200)]],
      address: ['', [Validators.required,, Validators.maxLength(200)]],
      phone: ['', [Validators.required, this.phoneValidator]]
    });
  }
  ngOnInit(): void {
    let userId = localStorage.getItem('id');
    this.userId = userId!;
    this.loadUserById(userId!);
  }
  async loadUserById(userId: string) {
    let user = await this.userReadService.findById(userId);
    console.log(user);
    this.form.controls['name'].setValue(user.name);
    this.form.controls['email'].setValue(user.email);
    this.form.controls['phone'].setValue(user.phone);
    this.form.controls['address'].setValue(user.address);
    const img = document.getElementById('image-preview') as HTMLImageElement;
    if (img && user.image) {
      this.image = user.image;
      img.src = user.image;
      img.style.display = 'block';
    }
  }

  phoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value || '';
    const phonePattern = /^[0-9]{10,11}$/;
    if (!phonePattern.test(value)) {
      return { invalidPhone: true };
    }
    return null;
  }

}
