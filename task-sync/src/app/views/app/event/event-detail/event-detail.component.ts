import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventReadService } from '../../../../services/event/event-read.service';
import { Event } from "../../../../domain/model/event.model";
@Component({
  selector: 'task-sync-event-detail',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit {
  eventInformation?: Event;
  accessType?: string | null;
  selectedImage: File | null = null;
  fileName: string = 'Nenhum arquivo escolhido';
  showImagePreview: boolean = false;
  image!: string;
  constructor(private route: ActivatedRoute,
  private eventReadSevice: EventReadService) { 
    this.accessType = localStorage.getItem('accessType')
  }
  ngOnInit(): void {
    let eventId = this.route.snapshot.paramMap.get('id');
    console.log(`ID do evento: ${eventId}`);
    this.loadEventById(eventId!);
  }
  async loadEventById(eventId: string) {
    let event = await this.eventReadSevice.findById(eventId);
    console.log(event);
    this.eventInformation = event;
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
    const imageInput = document.getElementById('img-event') as HTMLInputElement;
    if (imageInput) {
      imageInput.click();
    } else {
      console.error('Elemento com ID "img-event" não encontrado.');
    }
  }
}
