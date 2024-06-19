import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../../domain/model/user.model';
import * as fontawesome from '@fortawesome/free-solid-svg-icons';
import { UserDeleteService } from '../../../../services/user/user-delete.service';
import { UserReadService } from '../../../../services/user/user-read.service';

@Component({
  selector: 'task-sync-user-list',
  standalone: true,
  imports: [    
    FontAwesomeModule,
    RouterModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  fa = fontawesome;

  users: User[] = [];

  constructor(private userReadService: UserReadService, private userDeleteService: UserDeleteService, private toastrService: ToastrService
  ){

  }

  ngOnInit(): void {
    this.loadUsers();
    
  }

  async loadUsers(){
    this.users = await this.userReadService.findAll();
  }




  async deleteUser(userId: string){
    try {
      console.log('iniciando a remocao do usero' + userId);
      await this.userDeleteService.delete(userId);
      this.toastrService.success('Usero excluido com sucesso');

      await this.loadUsers();
    } catch (error) {
      this.toastrService.error('Não foi possível remover o usero');
      
    }
    
  }

}