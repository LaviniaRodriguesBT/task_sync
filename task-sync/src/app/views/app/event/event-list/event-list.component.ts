import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import * as fontawesome from '@fortawesome/free-solid-svg-icons';
import { EventDeleteService } from "../../../../services/event/event-delete.service";
import { ToastrService } from "ngx-toastr";
import { EventReadService } from "../../../../services/event/event-read.service";
import { Event } from "../../../../domain/model/event.model";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { jsPDF } from 'jspdf';
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'task-sync-event-list',
  standalone: true,
  imports: [MatCardModule,
    FontAwesomeModule,
    RouterModule,
    CommonModule,
    MatIconModule,
    MatPaginatorModule
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  fa = fontawesome;
  faAdd = faPlus;
  events: Event[] = [];
  eventsCopy: Event[] = [];
  accessType?: string | null;

  constructor(private eventReadService: EventReadService,
    private eventDeleteService: EventDeleteService,
    private toastrService: ToastrService,
   
    
  ) {
    this.accessType = localStorage.getItem('accessType')
  }

  ngOnInit(): void {
    this.loadEvents();
  }
  async loadEvents() {
    this.events = await this.eventReadService.findAll();
    this.eventsCopy = this.events;
  }
  async deleteEvent(eventId: string) {
    try {
      console.log('iniciando a remocao do evento' + eventId);
      await this.eventDeleteService.delete(eventId);
      this.toastrService.success('Evento excluido com sucesso');
      await this.loadEvents();
    } catch (error) {
      this.toastrService.error('Não foi possível remover o evento');
    }
  }
  gerarPdf() {
    window.print()
  }
  previousPage() {
  }
  nextPage() {
  }
  



  searchText: string = "";
  search(): void {
    let input = document.getElementById('search') as HTMLInputElement;

    let name = input.value;

    if (this.eventsCopy.length <= 0 || this.eventsCopy == null)
      return;

    if (name == null || name == undefined || name.length <= 0) {
      this.events = this.eventsCopy;
      this.searchText = "";
      return;
    }

    this.searchText = name;
    let events = this.eventsCopy.filter(
      (predicate) => predicate.name?.toLocaleLowerCase().includes(name.toLocaleLowerCase()) ||
        predicate.description?.toLocaleLowerCase().includes(name.toLocaleLowerCase()) ||
        predicate.business?.toLocaleLowerCase().includes(name.toLocaleLowerCase()));

    if (events == undefined) {
      this.events = [];
      return;
    }
    this.events = events;
  }


  // length = 50;
  // pageSize = 10;
  // pageIndex = 0;
  // pageSizeOptions = [5, 10, 25];

  // hidePageSize = false;
  // showPageSizeOptions = true;
  // showFirstLastButtons = true;
  // disabled = false;

  // pageEvent?: PageEvent;

  // handlePageEvent(e: PageEvent) {
  //   this.pageEvent = e;
  //   this.length = e.length;
  //   this.pageSize = e.pageSize;
  //   this.pageIndex = e.pageIndex;

  //   this.events = this.eventsCopy.slice(this.pageIndex, this.pageSize);
  // }

  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   if (setPageSizeOptionsInput) {
  //     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  //   }
  // }


}
