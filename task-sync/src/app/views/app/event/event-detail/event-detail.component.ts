import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Events } from '../event-list/event-list.component';
import { EventsReadService } from '../../../../services/event/event-read.service';

@Component({
  selector: 'task-sync-event-detail',
  standalone: true,
  imports: [],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit{

  eventInformation?: Events;

  // o ? na frente da variavel significa pode ser nula ou ter valor

  constructor(private route: ActivatedRoute,
              private eventReadSevice: EventsReadService) {}

  ngOnInit(): void {
    let eventId = this.route.snapshot.paramMap.get('id'); 
    // olha na rota/URL e retorna o valor que está solicitando
    console.log(`ID do produto: ${eventId}`);
    this.loadEventById(eventId!);
    // o ! na frente da variavel significa que assegura ter o valor

  }

  async loadEventById(eventId: string){
    let event = await this.eventReadSevice.findById(eventId);
    console.log(event);
    this.eventInformation = event;
  }
}
