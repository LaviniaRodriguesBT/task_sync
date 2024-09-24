import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'task-sync-help',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css'
})
export class HelpComponent {
  accessType: string | null = null;

  ngOnInit() {
    this.accessType = localStorage.getItem('accessType');
  }
}
