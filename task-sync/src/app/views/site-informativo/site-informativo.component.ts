import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatExpansionPanel, MatExpansionModule } from '@angular/material/expansion'; 

@Component({
  selector: 'task-sync-site-informativo',
  standalone: true,
  imports: [
    MatExpansionModule,
    CommonModule
  ], 
  templateUrl: './site-informativo.component.html',
  styleUrls: ['./site-informativo.component.css']
})
export class SiteInformativoComponent {
  
  navigateTo(url: string) {
    window.open(url, '_blank'); 
  }

  isModalOpen = false;
  selectedImage: string | null = null;

  openModal(imagePath: string) {
    this.selectedImage = imagePath;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedImage = null;
  }
  
  isExpanded = false;

  onExpandChange(event: { expanded: boolean }) {
    this.isExpanded = event.expanded;
}

}
