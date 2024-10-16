import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './views/app/home/home.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'task-sync-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-sync';
}
