import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Scheduling } from '../../../../../domain/model/scheduling.model';
import { SchedulingReadService } from '../../../../../services/scheduling/scheduling-read.service';
import { SchedulingUpdateService } from '../../../../../services/scheduling/scheduling-update.service';

@Component({
  selector: 'task-sync-scheduling-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './scheduling-edit.component.html',
  styleUrl: './scheduling-edit.component.css'
})
export class SchedulingEditComponent implements OnInit {

  // schedulingInformation?: Schedulings;
  schedulingId?: string;
  form!: FormGroup;

  nameMinLength: number = 3;
  nameMaxLength: number = 10;
  priceMinValue: number = 1;
  priceMaxValue: number = 500;

  constructor(private activatedRoute: ActivatedRoute,
              private schedulingReadService: SchedulingReadService,
              private schedulingUpdateService: SchedulingUpdateService,
              private toastrService: ToastrService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      event_id: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      user_id: ['', [Validators.required, Validators.min(this.priceMinValue), Validators.max(this.priceMaxValue)]],
      task_id: ['', [Validators.required, Validators.min(this.priceMinValue), Validators.max(this.priceMaxValue)]],
      value: ['', [Validators.required, Validators.min(this.priceMinValue), Validators.max(this.priceMaxValue)]],
      start_time: ['', [Validators.required, Validators.min(this.priceMinValue), Validators.max(this.priceMaxValue)]],
      end_time: ['', [Validators.required, Validators.min(this.priceMinValue), Validators.max(this.priceMaxValue)]],
      date: ['', [Validators.required, Validators.min(this.priceMinValue), Validators.max(this.priceMaxValue)]],
      status: ['', [Validators.required, Validators.min(this.priceMinValue), Validators.max(this.priceMaxValue)]],
    });
  }

  ngOnInit(): void {
    let schedulingId = this.activatedRoute.snapshot.paramMap.get('id');
    this.schedulingId = schedulingId!;
    this.loadSchedulingById(schedulingId!);
  }

  async loadSchedulingById(schedulingId: string) {
    let scheduling = await this.schedulingReadService.findById(schedulingId);
    console.log(scheduling);
    this.form.controls['event_id'].setValue(scheduling.event_id);
    this.form.controls['user_id'].setValue(scheduling.user_id);
    this.form.controls['task_id'].setValue(scheduling.task_id);
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
        user_id: this.form.controls['user_id'].value,
        task_id: this.form.controls['task_id'].value,
        value: this.form.controls['value'].value,
        start_time: this.form.controls['start_time'].value,
        end_time: this.form.controls['end_time'].value,
        date: this.form.controls['date'].value,
        status: this.form.controls['status'].value,
    
      }

      console.log(scheduling);
      await this.schedulingUpdateService.update(scheduling);
      this.toastrService.success('Cronograma atualizado com sucesso!');
      this.router.navigate(['scheduling/list']);
    } catch (error) {
      this.toastrService.error('Erro. Cronograma não foi atualizado.');
    }
  }

  validateFields() {
    return this.form.controls['event_id'].valid
      && this.form.controls['user_id'].valid 
      && this.form.controls['task_id'].valid
      && this.form.controls['value'].valid
      && this.form.controls['start_time'].valid
      && this.form.controls['end_time'].valid
      && this.form.controls['date'].valid
      && this.form.controls['status'].valid;

  }

}

