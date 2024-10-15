import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../../../../domain/model/task.model';
import { TaskDeleteService } from '../../../../services/task/task-delete.service';
import { TaskReadService } from '../../../../services/task/task-read.service';
import * as fontawesome from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { IgxExcelExporterOptions, IgxExcelExporterService } from 'igniteui-angular';
import { MatPaginatorModule, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { NgbModalRef, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'task-sync-task-list',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterModule,
    CommonModule,
    MatIconModule,
    MatPaginatorModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  userId?: string;
  accessType?: string | null;

  fa = fontawesome;

  faAdd = faPlus;
  tasks: Task[] = [];
  tasksCopy: Task[] = [];
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [3,5, 10, 15];
  searchText: string = "";
  modalRef: NgbModalRef | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskReadService: TaskReadService,
    private taskDeleteService: TaskDeleteService,
    private toastrService: ToastrService,
    private excelExporter: IgxExcelExporterService,
    public _MatPaginatorIntl: MatPaginatorIntl,
    private modalService: NgbModal
   
  ) {
    this.accessType = localStorage.getItem('accessType')
  }

  ngOnInit(): void {
    let userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.userId = userId!;
    this.loadTasks();
    this.length = this.tasksCopy.length;
  }

  async loadTasks() {
    this.tasks = await this.taskReadService.findAll();
    this.tasksCopy = this.tasks;
    this.length = this.tasks.length;
    this._MatPaginatorIntl.itemsPerPageLabel = "Itens por página";
    this._MatPaginatorIntl.previousPageLabel = "Voltar a página anterior";
    this._MatPaginatorIntl.nextPageLabel = "Próxima pagina";


    if (this.userId! != null) {
      this.tasks = this.tasks.filter(e => e.id == this.userId);
    }
    this._MatPaginatorIntl.getRangeLabel = (page, pageSize, length) => {
      if (length == 0) {
          return `Nenhum resultado encontrado.`;
      }
      const from = page * pageSize + 1;
      const to = Math.min(from + pageSize - 1, length);
      return `${from} - ${to} de ${length}`;};
  }

  async deleteTask(taskId: string) {
    try {
      console.log('iniciando a remocao da atividade' + taskId);
      await this.taskDeleteService.delete(taskId);
      this.toastrService.success('Atividade excluido com sucesso');

      await this.loadTasks();
    } catch (error) {
      this.toastrService.error('Não foi possível remover a atividade');

    }

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
    if (this.modalRef) {this.modalRef.close();
    }
  }
  gerarPdf() {
    window.print()
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.tasks = this.tasks.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
  }

  public exportExcelEventList() {
    this.excelExporter.exportData(this.tasks, new IgxExcelExporterOptions('ExportedDataFile'));

  }

  search(): void {
    let input = document.getElementById('search') as HTMLInputElement;

    let name = input.value;

    if (this.tasksCopy.length <= 0 || this.tasksCopy == null)
      return;

    if (name == null || name == undefined || name.length <= 0) {
      this.tasks = this.tasksCopy;
      this.searchText = "";
      return;
    }

    this.searchText = name;
    let tasks = this.tasksCopy.filter((predicate) => predicate.name?.toLocaleLowerCase().includes(name.toLocaleLowerCase()));

    if (tasks == undefined) {
      this.tasks = [];
      return;
    }
    this.tasks = tasks;
  }

}
