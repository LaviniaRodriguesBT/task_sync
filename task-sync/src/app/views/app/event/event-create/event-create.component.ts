import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventCreateService } from '../../../../services/event/event-create.service';
import { Event } from "../../../../domain/model/event.model";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'task-sync-event-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  @ViewChild('imagePreview') imagePreview!: ElementRef<HTMLImageElement>;
  @ViewChild('imgEvent') imgEvent!: ElementRef<HTMLInputElement>;
  @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;

  form!: FormGroup;
  nameMinLength: number = 3;

  descriptionMinValue: number = 10;

  selectedImage: File | null = null;
  fileName: string = 'Nenhum arquivo escolhido';
  showImagePreview: boolean = false;
  image!: string;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private eventCreateService: EventCreateService,
    private renderer: Renderer2
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.dateInput.nativeElement.min = new Date().toISOString().split('T')[0];
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      code: ['', [Validators.required, Validators.maxLength(20)]],
      name: ['', [Validators.required, Validators.minLength(this.nameMinLength), Validators.maxLength(200)]],
      description: ['', [Validators.required, Validators.minLength(this.descriptionMinValue), Validators.maxLength(200)]],
      business: ['', [Validators.required, Validators.maxLength(200)]],
      date: ['', [Validators.required]],
      start_time: ['', [Validators.required]],
      end_time: ['', [Validators.required]]
    });
  }
  
  validateNumber(event: KeyboardEvent) {
    const charCode = event.keyCode ? event.keyCode : event.which;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); 
    }
  }

  async create() {
    if (this.form.invalid) {
      this.toastr.error('Preencha todos os campos obrigatórios corretamente antes de cadastrar o evento.');
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
      image: this.image,
    };

    try {
      await this.eventCreateService.create(event);
      this.toastr.success('Dados salvos com sucesso!');
      this.router.navigate(['event/list']);
    } catch (error: any) {
      this.toastr.error('Erro ao salvar os dados: ' + error.message);
    }
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      this.fileName = file.name;
      this.showImagePreview = true;

      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result as string;
        if (this.imagePreview) {
          this.imagePreview.nativeElement.src = this.image;
          this.imagePreview.nativeElement.style.display = 'block';
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

  validateFields() {
    return this.form.valid;
  }
}
