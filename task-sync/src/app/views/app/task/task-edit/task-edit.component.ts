import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../../../../domain/model/task.model';
import { TaskReadService } from '../../../../services/task/task-read.service';
import { TaskUpdateService } from '../../../../services/task/task-update.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'task-sync-task-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent {
  taskId?: string;
  userId: string|null = '';
  form!: FormGroup;
  nameMinLength: number = 3;
  nameMaxLength: number = 200;
  constructor(private activatedRoute: ActivatedRoute,
    private taskReadService: TaskReadService,
    private taskUpdateService: TaskUpdateService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.initializeForm();
  }
  initializeForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(200)]],
    });
  }
  ngOnInit(): void {
    let taskId = this.activatedRoute.snapshot.paramMap.get('id');
    this.taskId = taskId!;
    this.loadTaskById(taskId!);
    this.userId = localStorage.getItem('id');
  }
  async loadTaskById(taskId: string) {
    let task = await this.taskReadService.findById(taskId);
    console.log(task);
    this.form.controls['name'].setValue(task.name);
  }
  async update() {
    try {
      const task: Task = {
        id: this.taskId!,
        name: this.form.controls['name'].value,
        userId: this.userId!
      }
      console.log(task);
      await this.taskUpdateService.update(task);
      this.toastrService.success('Atividade atualizada com sucesso!');
      this.router.navigate(['task/list']);
    } catch (error) {
      this.toastrService.error('Erro. Atividade não foi atualizada.');
    }
  }
  validateFields() {
    return this.form.valid;
  }
}