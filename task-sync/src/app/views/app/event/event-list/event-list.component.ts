import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import * as fontawesome from '@fortawesome/free-solid-svg-icons';

import { EventDeleteService } from "../../../../services/event/event-delete.service";
import { ToastrService } from "ngx-toastr";
import { EventReadService } from "../../../../services/event/event-read.service";
import {Event} from "../../../../domain/model/event.model";



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
export class EventListComponent implements OnInit {
  fa = fontawesome;

  events: Event[] = [];

  constructor(private eventReadService: EventReadService, private eventDeleteService: EventDeleteService, private toastrService: ToastrService
  ){

  }

  ngOnInit(): void {
    this.loadEvents();
    
  }

  async loadEvents(){
    this.events = await this.eventReadService.findAll();
  }




  async deleteEvent(eventId: string){
    try {
      console.log('iniciando a remocao do evento' + eventId);
      await this.eventDeleteService.delete(eventId);
      this.toastrService.success('Evento excluido com sucesso');

      await this.loadEvents();
    } catch (error) {
      this.toastrService.error('Não foi possível remover o evento');
      
    }
    
  }



}


