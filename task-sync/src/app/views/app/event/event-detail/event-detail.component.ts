import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventReadService } from '../../../../services/event/event-read.service';
import {Event} from "../../../../domain/model/event.model";

@Component({
  selector: 'task-sync-event-detail',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit{

  eventInformation?: Event;

  // o ? na frente da variavel significa pode ser nula ou ter valor

  constructor(private route: ActivatedRoute,
              private eventReadSevice: EventReadService) {}

  ngOnInit(): void {
    let eventId = this.route.snapshot.paramMap.get('id'); 
    // olha na rota/URL e retorna o valor que está solicitando
    console.log(`ID do evento: ${eventId}`);
    this.loadEventById(eventId!);
    // o ! na frente da variavel significa que assegura ter o valor

  }

  async loadEventById(eventId: string){
    let event = await this.eventReadSevice.findById(eventId);
    console.log(event);
    this.eventInformation = event;
  }
}
