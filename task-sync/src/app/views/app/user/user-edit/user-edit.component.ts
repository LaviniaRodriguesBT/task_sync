import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../../domain/model/user.model';
import { UserReadService } from '../../../../services/user/user-read.service';
import { UserUpdateService } from '../../../../services/user/user-update.service';

@Component({
  selector: 'user-sync-user-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {

  // userInformation?: Users;
  userId?: string;
  form!: FormGroup;


  nameMinLength: number = 3;
  nameMaxLength: number = 10;
  priceMinValue: number = 1;
  priceMaxValue: number = 500;

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
    // this.userInformation = user;
    this.form.controls['name'].setValue(user.name);
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

}


