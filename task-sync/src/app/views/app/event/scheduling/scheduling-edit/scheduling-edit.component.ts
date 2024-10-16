import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Scheduling } from '../../../../../domain/model/scheduling.model';
import { SchedulingReadService } from '../../../../../services/scheduling/scheduling-read.service';
import { SchedulingUpdateService } from '../../../../../services/scheduling/scheduling-update.service';
import { EventReadService } from '../../../../../services/event/event-read.service';
import { Event } from '../../../../../domain/model/event.model';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../../../domain/model/user.model';
import { Task } from '../../../../../domain/model/task.model';
import { UserReadService } from '../../../../../services/user/user-read.service';
import { TaskReadService } from '../../../../../services/task/task-read.service';
import { CommonModule } from '@angular/common';
import { monetaryValidator } from '../monetary-validator';

@Component({
  selector: 'task-sync-scheduling-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatSelectModule,
    CommonModule
  ],
  templateUrl: './scheduling-edit.component.html',
  styleUrl: './scheduling-edit.component.css'
})
export class SchedulingEditComponent implements OnInit {

  schedulingId?: string;
  form!: FormGroup;
  eventId: string = '';
  event!: Event;

  nameMinLength: number = 3;
  nameMaxLength: number = 100;
  descriptionMinValue: number = 1;
  descriptionMaxValue: number = 500;

  userList: User [] = [];
  taskList: Task [] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private schedulingReadService: SchedulingReadService,
    private schedulingUpdateService: SchedulingUpdateService,
    private toastrService: ToastrService,
    private router: Router,
    private eventReadService: EventReadService,
    private userReadService: UserReadService,
    private taskReadService: TaskReadService,
    private formBuilder: FormBuilder) {
    this.initializeForm();
    this.eventId = this.form.controls['event_id'].value;
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

  async ngOnInit() {
    this.userList = await this.userReadService.findAll();
    this.taskList = await this.taskReadService.findAll();
    this.eventId = this.activatedRoute.snapshot.paramMap.get('eventId')!;
    this.event = await this.eventReadService.findById(this.eventId);
    let schedulingId = this.activatedRoute.snapshot.paramMap.get('id');
    this.schedulingId = schedulingId!;
    this.loadSchedulingById(schedulingId!);

  }

  async loadSchedulingById(schedulingId: string) {
    
    let scheduling = await this.schedulingReadService.findById(schedulingId);
    console.log(scheduling);
    this.form.controls['event_id'].setValue(scheduling.event.id);
    this.form.controls['user_id'].setValue(scheduling.user.id);
    this.form.controls['task_id'].setValue(scheduling.task.id);
    this.form.controls['value'].setValue(scheduling.value);
    this.form.controls['start_time'].setValue(scheduling.start_time);
    this.form.controls['end_time'].setValue(scheduling.end_time);
    this.form.controls['date'].setValue(scheduling.date);
    this.form.controls['status'].setValue(scheduling.status);
  }

  async update() {
    try {
      const scheduling: Scheduling = {
        id: this.schedulingId!,
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
      scheduling.event = this.event.name;
      console.log(scheduling);
      await this.schedulingUpdateService.update(scheduling);
      this.toastrService.success('Cronograma atualizado com sucesso!');
      this.router.navigate([`/event/${this.eventId}/scheduling/list`]);
    } catch (error) {
      this.toastrService.error('Erro. Cronograma não foi atualizado.');
    }
  }

  validateFields() {
    return this.form.valid;
  }

}

