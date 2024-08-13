import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventCreateService } from '../../../../services/event/event-create.service';
import { Event } from "../../../../domain/model/event.model";

@Component({
  selector: 'task-sync-event-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.css'
})
export class EventCreateComponent implements OnInit {

  form!: FormGroup;

  nameMinLength: number = 3;
  nameMaxLength: number = 10;
  descriptionMinValue: number = 1;
  descriptionMaxValue: number = 500;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private eventCreateService: EventCreateService) {

    this.initializeForm();
  }

  ngOnInit(): void {
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      code: ['', [Validators.required, Validators.min(this.descriptionMinValue), Validators.max(this.descriptionMaxValue)]],
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      description: ['', [Validators.required, Validators.min(this.descriptionMinValue), Validators.max(this.descriptionMaxValue)]],
      business: ['', [Validators.required, Validators.min(this.descriptionMinValue), Validators.max(this.descriptionMaxValue)]],
      date: ['', [Validators.required, Validators.min(this.descriptionMinValue), Validators.max(this.descriptionMaxValue)]],
    });
  }

  async create() {
    const event: Event = {
      code: this.form.controls['code'].value,
      name: this.form.controls['name'].value,
      description: this.form.controls['description'].value,
      business: this.form.controls['business'].value,
      date: this.form.controls['date'].value,
    }

    console.log('preparando para criar o evento...');
    console.log(event);

    try {
      await this.eventCreateService.create(event);
      this.toastr.success('Dados salvos com sucesso!');
      this.router.navigate(['event/list']);
    } catch (error: any) {
      this.toastr.error(error.message);
    }
  }

  validateFields() {
    return this.form.controls['name'].valid
      && this.form.controls['description'].valid && this.form.controls['date'].valid;
  }

}


