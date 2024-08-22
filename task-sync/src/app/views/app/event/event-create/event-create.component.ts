import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventCreateService } from '../../../../services/event/event-create.service';
import { Event } from "../../../../domain/model/event.model";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'task-sync-event-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
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
  selectedImage: File | null = null;
  fileName: string = 'Nenhum arquivo escolhido';
  showImagePreview: boolean = false;
  

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private eventCreateService: EventCreateService) {

    this.initializeForm();
  }

  ngOnInit(): void {
    let dateInput = document.getElementById("date") as HTMLInputElement;

    dateInput.min = new Date().toLocaleDateString('pt-BR');

  }

  onSubmit() {
    if (this.form.invalid) {
      this.toastr.error('Please fix form errors before submitting.');
      this.showImagePreview = false;
      return;
    }
  }

onImageSelected(event: any) {
  const file = event.target.files[0];
  this.selectedImage = file;
  this.fileName = file.name;

  const reader = new FileReader();
  reader.onload = (e) => {
    const img = document.getElementById('image-preview') as HTMLImageElement;
    img.src = e.target?.result as string;
    img.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

  openImagePicker() {
    const imageInput = document.getElementById('img-event');
    if (imageInput) {
        imageInput.click();
    } else {
        console.error('Elemento com ID "img-event" não encontrado.');
      
    }
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
