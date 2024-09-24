import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'task-sync-my-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
  accessType: string | null = null;

  ngOnInit() {
    this.accessType = localStorage.getItem('accessType');
  }
}
