import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'task-sync-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  accessType: string | null = null;

  ngOnInit() {
    this.accessType = localStorage.getItem('accessType');
  }
}
