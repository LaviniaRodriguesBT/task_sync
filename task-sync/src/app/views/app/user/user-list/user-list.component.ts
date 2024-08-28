import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../../domain/model/user.model';
import * as fontawesome from '@fortawesome/free-solid-svg-icons';
import { UserDeleteService } from '../../../../services/user/user-delete.service';
import { UserReadService } from '../../../../services/user/user-read.service';
import { faAddressCard, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'task-sync-user-list',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  fa = fontawesome;
  faAdd = faPlus;
  faAddressCard = faAddressCard;
  users: User[] = [];
  usersCopy: User[] = [];

  constructor(private userReadService: UserReadService, 
    private userDeleteService: UserDeleteService, 
    private toastrService: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.loadUsers();

  }

  async loadUsers() {
    this.users = await this.userReadService.findAll();
    this.usersCopy = this.users;
  }

  async deleteUser(userId: string) {
    try {
      console.log('Iniciando a remocao da pessoa' + userId);
      await this.userDeleteService.delete(userId);
      this.toastrService.success('Pessoa excluida com sucesso');

      await this.loadUsers();
    } catch (error) {
      this.toastrService.error('Não foi possível remover a pessoa');

    }
    
  }
  gerarPdf() {
    window.print()
  }
  previousPage() {
  }
  nextPage() {
  }

  searchText: string = "";

  search(): void {
    let input = document.getElementById('search') as HTMLInputElement;

    let name = input.value;

    if (this.usersCopy.length <= 0 || this.usersCopy == null)
      return;

    if (name == null || name == undefined || name.length <= 0) {
      this.users = this.usersCopy;
      this.searchText = "";
      return;
    }

    this.searchText = name;
    let users = this.usersCopy.filter((predicate) => predicate.name?.toLocaleLowerCase().includes(name.toLocaleLowerCase()));

    if (users == undefined) {
      this.users = [];
      return;
    }
    this.users = users;
  }

}
