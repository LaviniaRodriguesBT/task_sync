import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as fontawesome from '@fortawesome/free-solid-svg-icons';
import { EventReadService } from '../../../../services/event/event-read.service';
import { EventDeleteService } from '../../../../services/event/event-delete.service';

@Component({
  selector: 'task-sync-event-list',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterModule,
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit{

  fa = fontawesome;
  events: Event[] = [];

  constructor(private eventReadService: EventReadService, private eventDeleteService: EventDeleteService){}

  ngOnInit(): void {
    this.loadEvent();
  }

  async loadEvent() {
    this.events =  await this.eventReadService.findAll();
  }

  async deleteEvent(eventId: string){
    console.log('inciando a remoção do evento ' + eventId);
    await this.eventDeleteService.delete(eventId);
  }


  // products: Products[] = [
  //   {
  //     id: 1,
  //     name: 'produto 1',
  //     price: 44.54
  //   },
  //   {
  //     id: 2,
  //     name: 'produto 2',
  //     price: 34.65
  //   },
  //   {
  //     id: 3,
  //     name: 'produto 3',
  //     price: 99.63
  //   },
  //   {
  //     id: 4,
  //     name: 'produto 4',
  //     price: 21.21
  //   },
  //   {
  //     id: 5,
  //     name: 'produto 5',
  //     price: 26.26
  //   },
  //   {
  //     id: 6,
  //     name: 'produto 6',
  //     price: 31.31
  //   }
  // ];
}
export interface Event {
  id: number;
  name: String;
  price: number;
}