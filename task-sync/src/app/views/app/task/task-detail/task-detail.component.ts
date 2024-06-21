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

  constructor(private route: ActivatedRoute,
    private taskReadSevice: TaskReadService) { }

  ngOnInit(): void {
    let taskId = this.route.snapshot.paramMap.get('id');
    console.log(`ID do produto: ${taskId}`);
    this.loadTaskById(taskId!);
  }

  async loadTaskById(taskId: string) {
    let task = await this.taskReadSevice.findById(taskId);
    console.log(task);
    this.taskInformation = task;
  }
}