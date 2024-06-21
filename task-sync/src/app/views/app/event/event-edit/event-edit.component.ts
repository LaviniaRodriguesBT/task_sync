import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventUpdateService } from '../../../../services/event/event-update.service';
import { EventReadService } from '../../../../services/event/event-read.service';
import {Event} from "../../../../domain/model/event.model";

@Component({
  selector: 'task-sync-event-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './event-edit.component.html',
  styleUrl: './event-edit.component.css'
})
export class EventEditComponent implements OnInit {

  // eventInformation?: Events;
  eventId?: string;
  form!: FormGroup;

  nameMinLength: number = 3;
  nameMaxLength: number = 10;
  priceMinValue: number = 1;
  priceMaxValue: number = 500;

  constructor(private activatedRoute: ActivatedRoute,
              private eventReadService: EventReadService,
              private eventUpdateService: EventUpdateService,
              private toastrService: ToastrService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      price: ['', [Validators.required, Validators.min(this.priceMinValue), Validators.max(this.priceMaxValue)]],
    });
  }

  ngOnInit(): void {
    let eventId = this.activatedRoute.snapshot.paramMap.get('id');
    this.eventId = eventId!;
    this.loadEventById(eventId!);
  }

  async loadEventById(eventId: string) {
    let event = await this.eventReadService.findById(eventId);
    console.log(event);
    this.form.controls['name'].setValue(event.name);
    this.form.controls['description'].setValue(event.description);
    this.form.controls['date'].setValue(event.date);
  }

  async update() {
    try {
      const event: Event = {
        id: this.eventId!,
        name: this.form.controls['name'].value,
        description: this.form.controls['description'].value,
        date: this.form.controls['date'].value,
      }

      console.log(event);
      await this.eventUpdateService.update(event);
      this.toastrService.success('Produto atualizado com sucesso!');
      this.router.navigate(['event/list']);
    } catch (error) {
      this.toastrService.error('Erro. Produto não foi atualizado.');
    }
  }

  validateFields() {
    return this.form.controls['name'].valid
      && this.form.controls['description'].valid && this.form.controls['date'].valid;
  }

}

