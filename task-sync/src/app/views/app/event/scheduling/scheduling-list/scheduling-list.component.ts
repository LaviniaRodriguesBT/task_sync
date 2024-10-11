import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrService } from 'ngx-toastr';
import { Scheduling } from '../../../../../domain/model/scheduling.model';
import { SchedulingDeleteService } from '../../../../../services/scheduling/scheduling-delete.service';
import { SchedulingReadService } from '../../../../../services/scheduling/scheduling-read.service';
import * as fontawesome from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ResponseScheduling } from '../../../../../domain/dto/response-scheduling';
import { IgxExcelExporterOptions, IgxExcelExporterService } from 'igniteui-angular';
import { SchedulingUpdateService } from '../../../../../services/scheduling/scheduling-update.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'task-sync-scheduling-list',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './scheduling-list.component.html',
  styleUrl: './scheduling-list.component.css'
})
export class SchedulingListComponent implements OnInit {
  fa = fontawesome;
  faAdd = faPlus;
  eventId: string = '';
  userId?: string | null;
  accessType?: string | null;
  form!: FormGroup;


  schedulings: ResponseScheduling[] = [];
  schedulingCopy: ResponseScheduling[] = [];

  constructor(
    private schedulingReadService: SchedulingReadService,
    private schedulingDeleteService: SchedulingDeleteService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private excelExporter: IgxExcelExporterService,
    private updateStatus: SchedulingUpdateService,
    private formBuilder: FormBuilder,

  ) {
    this.userId = localStorage.getItem('id');
    this.accessType = localStorage.getItem('accessType')
  }
  ngOnInit(): void {
    this.eventId = this.activatedRoute.snapshot.paramMap.get('eventId')!;
    this.loadSchedulings();
    this.initializeForm();
  }

  async loadSchedulings() {
    this.schedulings = await this.schedulingReadService.findByEventId(this.eventId);
    console.log(this.schedulings);
    this.schedulingCopy = this.schedulings;
    // this.schedulings = this.schedulingCopy.filter(predicate => predicate.userId == this.userId); 
  }

  async deleteScheduling(schedulingId: string) {
    try {
      console.log('Iniciando a remoção do cronograma' + schedulingId);
      await this.schedulingDeleteService.delete(schedulingId);
      this.toastrService.success('Cronograma excluído com sucesso');

      await this.loadSchedulings();
    } catch (error) {
      this.toastrService.error('Não foi possível remover o cronograma');
    }
  }
  initializeForm() {
    this.form = this.formBuilder.group({
      status: [''],
    });
  }

  async update(scheduling: ResponseScheduling) {
    try {


      const schedulingUpdate: Scheduling = {
        id: scheduling.id,
        event_id: scheduling.event.id!,
        user_id: scheduling.user.id!,
        userId: scheduling.user.id!,
        task_id: scheduling.task.id!,
        event: scheduling.event.name,
        value: scheduling.value,
        start_time: scheduling.start_time,
        end_time: scheduling.end_time,
        date: scheduling.date,
        status: this.form.controls["status"].value,

      }
      console.log(schedulingUpdate);
      await this.updateStatus.update(schedulingUpdate);
      this.toastrService.success('Cronograma atualizado com sucesso!');

    } catch (error) {
      this.toastrService.error('Erro. Cronograma não foi atualizado.');
    }
  }

  gerarPdf() {
    window.print()
  }
  previousPage() {
  }
  nextPage() {
  }

  public exportExcelEventList() {
    this.excelExporter.exportData(this.schedulings, new IgxExcelExporterOptions('ExportedDataFile'));

  }


  searchText: string = "";

  search(): void {
    let input = document.getElementById('search') as HTMLInputElement;

    let event = input.value;

    if (this.schedulingCopy.length <= 0 || this.schedulingCopy == null)
      return;

    if (event == null || event == undefined || event.length <= 0) {
      this.schedulings = this.schedulingCopy;
      this.searchText = "";
      return;
    }

    this.searchText = event;
    let schedulings = this.schedulingCopy.filter((predicate) =>
      predicate.event.name?.toLocaleLowerCase().includes(event.toLocaleLowerCase()) ||
      predicate.task.name?.toLocaleLowerCase().includes(event.toLocaleLowerCase()) ||
      predicate.user.name?.toLocaleUpperCase().includes(event.toLocaleUpperCase()));

    if (schedulings == undefined) {
      this.schedulings = [];
      return;
    }
    this.schedulings = schedulings;
  }
}
