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

  constructor(private route: ActivatedRoute,
    private eventReadSevice: EventReadService) { }

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
}
