import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Scheduling } from '../../../../../domain/model/scheduling.model';
import { SchedulingReadService } from '../../../../../services/scheduling/scheduling-read.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { SchedulingDeleteService } from '../../../../../services/scheduling/scheduling-delete.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'task-sync-scheduling-card',
  standalone: true,
  imports: [MatCardModule,
    FontAwesomeModule,
    RouterModule,
  ],
  templateUrl: './scheduling-card.component.html',
  styleUrl: './scheduling-card.component.css'
})
export class SchedulingCardComponent implements OnInit {
  
  faAdd = faPlus;
  schedulings: Scheduling[] = [];
  constructor(private schedulingReadService: SchedulingReadService, private schedulingDeleteService: SchedulingDeleteService, private toastrService: ToastrService
  ) {

  }
  ngOnInit(): void {
    this.loadSchedulings();

  }
  async loadSchedulings() {
    this.schedulings = await this.schedulingReadService.findAll();
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
}
