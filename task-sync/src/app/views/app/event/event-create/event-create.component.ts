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
  styleUrls: ['./event-create.component.css']
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
    private eventCreateService: EventCreateService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    let dateInput = document.getElementById("date") as HTMLInputElement;
    if (dateInput) {
      dateInput.min = new Date().toISOString().split('T')[0];
    }
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      code: ['', [Validators.required, Validators.min(this.descriptionMinValue), Validators.max(this.descriptionMaxValue)]],
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(this.nameMaxLength)]],
      description: ['', [Validators.required, Validators.min(this.descriptionMinValue), Validators.max(this.descriptionMaxValue)]],
      business: ['', [Validators.required, Validators.min(this.descriptionMinValue), Validators.max(this.descriptionMaxValue)]],
      date: ['', [Validators.required]],
      start_time: ['', [Validators.required]],
      end_time: ['', [Validators.required]]
    });
  }

  async create() {
    if (this.form.invalid) {
      this.toastr.error('Preencha todos os campos obrigatórios antes de cadastrar o evento.');
      return;
    }

    const event: Event = {
      code: this.form.get('code')?.value,
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
      business: this.form.get('business')?.value,
      date: this.form.get('date')?.value,
      start_time: this.form.get('start_time')?.value,
      end_time: this.form.get('end_time')?.value,
    };

    console.log('Preparando para criar o evento...');
    console.log(event);

    try {
      await this.eventCreateService.create(event);
      this.toastr.success('Dados salvos com sucesso!');
      this.router.navigate(['event/list']);
    } catch (error: any) {
      this.toastr.error(error.message);
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
    const imageInput = document.getElementById('img-event') as HTMLInputElement;
    if (imageInput) {
      imageInput.click();
    } else {
      console.error('Elemento com ID "img-event" não encontrado.');
    }
  }

  validateFields() {
    return this.form.valid;
  }
}
