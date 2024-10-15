import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

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
export class SiteInformativoComponent implements AfterViewInit {

  @ViewChild('menuButton', { static: true }) menuButton!: ElementRef;
  @ViewChild('closeButton', { static: true }) closeButton!: ElementRef;
  @ViewChild('mobileMenu', { static: true }) mobileMenu!: ElementRef;

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

  ngAfterViewInit(): void {
    if (this.menuButton && this.closeButton && this.mobileMenu) {
      this.menuButton.nativeElement.addEventListener('click', () => {
        this.mobileMenu.nativeElement.classList.add('active');
      });

      this.closeButton.nativeElement.addEventListener('click', () => {
        this.mobileMenu.nativeElement.classList.remove('active');
      });
    }
  }

  navigateTo(url: string) {
    window.open(url, '_blank');
  }

}
