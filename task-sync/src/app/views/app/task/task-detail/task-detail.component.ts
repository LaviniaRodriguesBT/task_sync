import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TaskReadService } from '../../../../services/task/task-read.service';
import { Task } from '../../../../domain/model/task.model';

@Component({
  selector: 'task-sync-task-detail',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent implements OnInit {
  
  taskInformation?: Task;

  // o ? na frente da variavel significa pode ser nula ou ter valor

  constructor(private route: ActivatedRoute,
              private taskReadSevice: TaskReadService) {}

  ngOnInit(): void {
    let taskId = this.route.snapshot.paramMap.get('id'); 
    // olha na rota/URL e retorna o valor que está solicitando
    console.log(`ID do produto: ${taskId}`);
    this.loadTaskById(taskId!);
    // o ! na frente da variavel significa que assegura ter o valor

  }

  async loadTaskById(taskId: string){
    let task = await this.taskReadSevice.findById(taskId);
    console.log(task);
    this.taskInformation = task;
  }
}



