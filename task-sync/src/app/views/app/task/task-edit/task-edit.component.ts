import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../../../../domain/model/task.model';
import { TaskReadService } from '../../../../services/task/task-read.service';
import { TaskUpdateService } from '../../../../services/task/task-update.service';

@Component({
  selector: 'task-sync-task-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent {

  // taskInformation?: Tasks;
  taskId?: string;
  form!: FormGroup;

  nameMinLength: number = 3;
  nameMaxLength: number = 10;
  priceMinValue: number = 1;
  priceMaxValue: number = 500;

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
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      
    });
  }

  ngOnInit(): void {
    let taskId = this.activatedRoute.snapshot.paramMap.get('id');
    this.taskId = taskId!;
    this.loadTaskById(taskId!);
  }

  async loadTaskById(taskId: string) {
    let task = await this.taskReadService.findById(taskId);
    console.log(task);
    // this.taskInformation = task;
    this.form.controls['name'].setValue(task.name);
  }

  async update() {
    try {
      // let task: Tasks = {
      //   id: this.taskInformation?.id!,
      //   name: this.taskInformation?.name!,
      //   price: this.taskInformation?.price!
      // }
      const task: Task = {
        id: this.taskId!,
        name: this.form.controls['name'].value,
    
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
    return this.form.controls['name'].valid;
  }

}


