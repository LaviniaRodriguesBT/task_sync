import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventUpdateService } from '../../../../services/event/event-update.service';
import { EventReadService } from '../../../../services/event/event-read.service';
import { Event } from "../../../../domain/model/event.model";
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'task-sync-event-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatSelectModule,
    CommonModule
  ],
  templateUrl: './event-edit.component.html',
  styleUrl: './event-edit.component.css'
})
export class EventEditComponent implements OnInit {
  @ViewChild('imagePreview') imagePreview!: ElementRef<HTMLImageElement>;
  @ViewChild('imgEvent') imgEvent!: ElementRef<HTMLInputElement>;
  @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;
  eventId?: string;
  form!: FormGroup;
  nameMinLength: number = 3;
  nameMaxLength: number = 200;
  descriptionMinValue: number = 3;
  descriptionMaxValue: number = 200;
  selectedImage: File | null = null;
  fileName: string = 'Nenhum arquivo escolhido';
  showImagePreview: boolean = false;
  image!: string;
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
      code: ['', [Validators.required, Validators.maxLength(20)]],
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.minLength(this.descriptionMinValue), Validators.maxLength(200)]],
      business: ['', [Validators.required, Validators.maxLength(200)]],
      date: ['', [Validators.required]],
      start_time: ['', [Validators.required]],
      end_time: ['', [Validators.required]]    });
  }
  ngOnInit(): void {
    let eventId = this.activatedRoute.snapshot.paramMap.get('id');
    this.eventId = eventId!;
    this.loadEventById(eventId!);
  }
  async loadEventById(eventId: string) {
    let event = await this.eventReadService.findById(eventId);
    console.log(event);
    this.form.controls['code'].setValue(event.code);
    this.form.controls['name'].setValue(event.name);
    this.form.controls['description'].setValue(event.description);
    this.form.controls['business'].setValue(event.business);
    this.form.controls['start_time'].setValue(event.start_time);
    this.form.controls['end_time'].setValue(event.end_time);
    this.form.controls['date'].setValue(event.date);
    const img = document.getElementById('image-preview') as HTMLImageElement;
        if (img && event.image)  {
          this.image = event.image;
          img.src = event.image;
          img.style.display = 'block';
        }
  }
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.fileName = file.name;
      this.showImagePreview = true;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = reader.result as string;
        const img = document.getElementById('image-preview') as HTMLImageElement;
        if (img) {
          img.src = e.target?.result as string;
          img.style.display = 'block';
        }
      };
      reader.readAsDataURL(file);
    } else {
      this.fileName = 'Nenhum arquivo escolhido';
      this.showImagePreview = false;
    }
  }
  openImagePicker() {
    if (this.imgEvent) {
      this.imgEvent.nativeElement.click();
    } else {
      console.error('Elemento com ID "img-event" não encontrado.');
    }
  }
  async update() {
    try {
      const event: Event = {
        id: this.eventId!,
        code: this.form.controls['code'].value,
        name: this.form.controls['name'].value,
        description: this.form.controls['description'].value,
        business: this.form.controls['business'].value,
        date: this.form.controls['date'].value,
        start_time: this.form.controls['start_time'].value,
        end_time: this.form.controls['end_time'].value,
        image: this.image,
      }
      console.log(event);
      await this.eventUpdateService.update(event);
      this.toastrService.success('Os dados do evento ' + event.name + ' foram atualizados com sucesso!');
      this.router.navigate(['event/list']);
    } catch (error) {
      this.toastrService.error('Erro. Não foi possível atualizar os dados do evento.');
    }
  }
  validateFields() {
    return this.form.valid;
  }
}
