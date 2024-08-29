import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskCreateService } from '../../../../services/task/task-create.service';
import { Task } from "../../../../domain/model/task.model";

@Component({
  selector: 'task-sync-task-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css'
})
export class TaskCreateComponent implements OnInit {

  form!: FormGroup;

  nameMinLength: number = 3;
  nameMaxLength: number = 10;


  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private taskCreateService: TaskCreateService) {

    this.initializeForm();
  }

  ngOnInit(): void {
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
    });
  }

  async create() {
    let formValid = this.validateFields()
    if(!formValid){
      this.toastr.error("Preencha todos os campos obrigatórios antes de cadastrar o atividade.");
      return 
    }

    const task: Task = {
      name: this.form.controls['name'].value,
    }

    console.log('preparando para criar o produto...');
    console.log(task);

    try {
      await this.taskCreateService.create(task);
      this.toastr.success('Dados salvos com sucesso!');
      this.router.navigate(['task/list']);
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  validateFields() {
    return this.form.controls['name'].valid;
  }

}