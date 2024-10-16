import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import * as fontawesome from '@fortawesome/free-solid-svg-icons';
import { EventDeleteService } from "../../../../services/event/event-delete.service";
import { ToastrService } from "ngx-toastr";
import { EventReadService } from "../../../../services/event/event-read.service";
import { Event } from "../../../../domain/model/event.model";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from "@angular/common";
import { PageEvent, MatPaginatorModule, MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { IgxExcelExporterOptions, IgxExcelExporterService } from 'igniteui-angular';
import { MatSelectModule } from "@angular/material/select";
import { NgbModal, NgbModalOptions, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SchedulingReadService } from "../../../../services/scheduling/scheduling-read.service";
import { MatIconModule } from '@angular/material/icon'; // Importar MatIconModule
import { MatBadgeModule } from '@angular/material/badge'; // Importar MatBadgeModule
@Component({
  selector: 'task-sync-event-list',
  standalone: true,
  imports: [
    MatCardModule,
    FontAwesomeModule,
    RouterModule,
    CommonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatBadgeModule
  ],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  faAdd = faPlus;
  events: Event[] = [];
  eventsCopy: Event[] = [];
  accessType?: string | null;
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [3, 5, 10, 15];
  searchText: string = "";
  modalRef: NgbModalRef | null = null;
  totalPessoas: Record<string, number> = {};
  eventId: string = '';
  constructor(
    private eventReadService: EventReadService,
    private eventDeleteService: EventDeleteService,
    private toastrService: ToastrService,
    private excelExporter: IgxExcelExporterService,
    public _MatPaginatorIntl: MatPaginatorIntl,
    private modalService: NgbModal,
    private schedulingReadService: SchedulingReadService,
    private route: ActivatedRoute,
  ) {
    this.accessType = localStorage.getItem('accessType');
  }
  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId')!;
    this.loadEvents();
    this._MatPaginatorIntl.itemsPerPageLabel = "Itens por página";
    this._MatPaginatorIntl.previousPageLabel = "Voltar a página anterior";
    this._MatPaginatorIntl.nextPageLabel = "Próxima pagina";
    this._MatPaginatorIntl.getRangeLabel = (page, pageSize, length) => {
      if (length == 0) {
        return `Nenhum resultado encontrado.`;
      }
      const from = page * pageSize + 1;
      const to = Math.min(from + pageSize - 1, length);
      return `${from} - ${to} de ${length}`;
    };
  }
  openMyModal(content: any) {
    const options: NgbModalOptions = {
      backdropClass: 'app-session-modal-backdrop',
      windowClass: 'app-session-modal-window',
    };
    this.modalRef = this.modalService.open(content, {
      windowClass: 'custom-modal-class'
    });
  }
  closeMyModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
  async loadEvents() {
    const userId = localStorage.getItem("id");
    this.events = await this.eventReadService.findUserById(userId!);
    this.eventsCopy = this.events;
    this.totalPessoas = {}; 
    for (const event of this.events) {
      if (event.id) {
        const schedulings = await this.schedulingReadService.findByEventId(event.id);
        this.totalPessoas[event.id] = schedulings.length; 
      } else {
        console.warn('Evento sem ID encontrado:', event);
      }
    }
    this.length = this.eventsCopy.length;
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
  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.events = this.eventsCopy.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }
  gerarPdf() {
    window.print();
  }
  public exportExcelEventList() {
    this.excelExporter.exportData(this.events, new IgxExcelExporterOptions('ExportedDataFile'));
  }
  search(): void {
    let input = document.getElementById('search') as HTMLInputElement;
    let name = input.value;
    if (this.eventsCopy.length <= 0 || this.eventsCopy == null) return;
    if (!name || name.length <= 0) {
      this.events = this.eventsCopy;
      this.searchText = "";
      return;
    }
    this.searchText = name;
    this.events = this.eventsCopy.filter(
      (predicate) =>
        predicate.name?.toLocaleLowerCase().includes(name.toLocaleLowerCase()) ||
        predicate.description?.toLocaleLowerCase().includes(name.toLocaleLowerCase()) ||
        predicate.business?.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    );
  }
}
