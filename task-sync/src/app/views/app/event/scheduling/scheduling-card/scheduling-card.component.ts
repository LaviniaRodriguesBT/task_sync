import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'task-sync-scheduling-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './scheduling-card.component.html',
  styleUrl: './scheduling-card.component.css'
})
export class SchedulingCardComponent {

}
