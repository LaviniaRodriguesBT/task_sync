import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Scheduling } from '../../../../../domain/model/scheduling.model';
import { SchedulingCreateService } from '../../../../../services/scheduling/scheduling-create.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EventReadService } from '../../../../../services/event/event-read.service';
import { Event } from '../../../../../domain/model/event.model';
import { User } from '../../../../../domain/model/user.model';
import { Task } from '../../../../../domain/model/task.model';
import { UserReadService } from '../../../../../services/user/user-read.service';
import { TaskReadService } from '../../../../../services/task/task-read.service';
import { CommonModule } from '@angular/common';
import { monetaryValidator } from '../monetary-validator';
@Component({
  selector: 'task-sync-scheduling-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule
  ],
  templateUrl: './scheduling-create.component.html',
  styleUrl: './scheduling-create.component.css'
})
export class SchedulingCreateComponent implements OnInit {
  eventId: string = '';
  event!: Event;
  form!: FormGroup;
  userList!: User[];
  taskList!: Task[];
  nameMinLength: number = 3;
  nameMaxLength: number = 100;
  descriptionMinValue: number = 1;
  descriptionMaxValue: number = 500;
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private schedulingCreateService: SchedulingCreateService,
    private eventReadService: EventReadService,
    private userReadService: UserReadService,
    private taskReadService: TaskReadService
  ) {
    this.initializeForm();
  }
  async ngOnInit() {
    this.eventId = this.activatedRoute.snapshot.paramMap.get('eventId')!;
    this.event = await this.eventReadService.findById(this.eventId);
    this.userList = await this.userReadService.findAll();
    this.taskList = await this.taskReadService.findAll();
  }
  initializeForm() {
    this.form = this.formBuilder.group({
      event_id: [''],
      event: [''],
      user_id: ['', Validators.required],
      task_id: ['', Validators.required],
      value: ['', [Validators.required, monetaryValidator()]], 
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
      date: ['', Validators.required],
      status: ['Em aberto', Validators.required],
    });
  }
  formatCurrency(event: any) {
    const input = event.target;
    let value = input.value;
    value = value.replace(/[^0-9,]/g, '');
    const parts = value.split(',');
    if (parts.length > 2) {
      value = parts[0] + ',' + parts.slice(1).join('').replace(/,/g, '');
    }
    if (parts.length > 1) {
      value = parts[0] + ',' + parts[1].substring(0, 2);
    }
    input.value = value;
  }
  async create() {
    const scheduling: Scheduling = {
      event_id: this.form.controls['event_id'].value,
      event: this.form.controls['event'].value,
      user_id: this.form.controls['user_id'].value,
      task_id: this.form.controls['task_id'].value,
      value: this.form.controls['value'].value,
      start_time: this.form.controls['start_time'].value,
      end_time: this.form.controls['end_time'].value,
      date: this.form.controls['date'].value,
      status: this.form.controls['status'].value,
    }
    scheduling.event_id = this.eventId;
    scheduling.event = this.event.name;
    console.log('preparando para criar o produto...');
    console.log(scheduling);
    try {
      const schedulingId =  await this.schedulingCreateService.create(scheduling);
      console.log(schedulingId);
      if(schedulingId == 0){
        this.toastr.error("Nao foi possivel salvar")
        return;
      }
      this.toastr.success('Dados salvos com sucesso!');
      this.router.navigate([`/event/${this.eventId}/scheduling/list`]);
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }
  validateFields() {
    return this.form.valid;
  }
}