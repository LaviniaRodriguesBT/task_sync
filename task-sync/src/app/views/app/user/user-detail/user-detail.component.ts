import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { User } from '../../../../domain/model/user.model';
import { UserReadService } from '../../../../services/user/user-read.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'task-sync-user-detail',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {

  userInformation?: User;
  showPassword: boolean = false;

  constructor(private route: ActivatedRoute,
    private userReadSevice: UserReadService) { }

  ngOnInit(): void {
    let userId = this.route.snapshot.paramMap.get('id');
    console.log(`ID do produto: ${userId}`);
    this.loadUserById(userId!);

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