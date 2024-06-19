import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { User } from '../../../../domain/model/user.model';
import { UserReadService } from '../../../../services/user/user-read.service';

@Component({
  selector: 'task-sync-user-detail',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {

  userInformation?: User;

  // o ? na frente da variavel significa pode ser nula ou ter valor

  constructor(private route: ActivatedRoute,
              private userReadSevice: UserReadService) {}

  ngOnInit(): void {
    let userId = this.route.snapshot.paramMap.get('id'); 
    // olha na rota/URL e retorna o valor que está solicitando
    console.log(`ID do produto: ${userId}`);
    this.loadUserById(userId!);
    // o ! na frente da variavel significa que assegura ter o valor

  }

  async loadUserById(userId: string){
    let user = await this.userReadSevice.findById(userId);
    console.log(user);
    this.userInformation = user;
  }
}