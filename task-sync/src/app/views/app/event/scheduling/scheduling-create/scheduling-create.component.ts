import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Scheduling } from '../../../../../domain/model/scheduling.model';
import { SchedulingCreateService } from '../../../../../services/scheduling/scheduling-create.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'task-sync-scheduling-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule
  ],
  templateUrl: './scheduling-create.component.html',
  styleUrl: './scheduling-create.component.css'
})
export class SchedulingCreateComponent implements OnInit {

  eventId: string = '';
  form!: FormGroup;

  nameMinLength: number = 3;
  nameMaxLength: number = 10;
  descriptionMinValue: number = 1;
  descriptionMaxValue: number = 500;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private schedulingCreateService: SchedulingCreateService) {

    this.initializeForm();
  }

  ngOnInit(): void {
    this.eventId = this.activatedRoute.snapshot.paramMap.get('eventId')!;
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      event_id: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      event: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      user_id: ['', [Validators.required, Validators.min(this.descriptionMinValue), Validators.max(this.descriptionMaxValue)]],
      task_id: ['', [Validators.required, Validators.min(this.descriptionMinValue), Validators.max(this.descriptionMaxValue)]],
      value: ['', [Validators.required, Validators.min(this.descriptionMinValue), Validators.max(this.descriptionMaxValue)]],
      start_time: ['', [Validators.required, Validators.min(this.descriptionMinValue), Validators.max(this.descriptionMaxValue)]],
      end_time: ['', [Validators.required, Validators.min(this.descriptionMinValue), Validators.max(this.descriptionMaxValue)]],
      date: ['', [Validators.required, Validators.min(this.descriptionMinValue), Validators.max(this.descriptionMaxValue)]],
      status: ['', [Validators.required, Validators.min(this.descriptionMinValue), Validators.max(this.descriptionMaxValue)]],

    });
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
    console.log('preparando para criar o produto...');
    console.log(scheduling);

    try {
      await this.schedulingCreateService.create(scheduling);
      this.toastr.success('Dados salvos com sucesso!');
      this.router.navigate([`/event/${this.eventId}/scheduling/list`]);
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  validateFields() {
    return this.form.controls['event_id'].valid
      && this.form.controls['event'].valid
      && this.form.controls['user_id'].valid
      && this.form.controls['task_id'].valid
      && this.form.controls['value'].valid
      && this.form.controls['start_time'].valid
      && this.form.controls['end_time'].valid
      && this.form.controls['date'].valid
      && this.form.controls['status'].valid;

  }

}