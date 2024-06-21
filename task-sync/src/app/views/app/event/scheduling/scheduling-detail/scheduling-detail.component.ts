import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Scheduling } from '../../../../../domain/model/scheduling.model';
import { SchedulingReadService } from '../../../../../services/scheduling/scheduling-read.service';

@Component({
  selector: 'task-sync-scheduling-detail',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './scheduling-detail.component.html',
  styleUrl: './scheduling-detail.component.css'
})
export class SchedulingDetailComponent implements OnInit{

  schedulingInformation?: Scheduling;

  // o ? na frente da variavel significa pode ser nula ou ter valor

  constructor(private route: ActivatedRoute,
              private schedulingReadSevice: SchedulingReadService) {}

  ngOnInit(): void {
    let schedulingId = this.route.snapshot.paramMap.get('id'); 
    // olha na rota/URL e retorna o valor que está solicitando
    console.log(`ID do schedulingo: ${schedulingId}`);
    this.loadSchedulingById(schedulingId!);
    // o ! na frente da variavel significa que assegura ter o valor

  }

  async loadSchedulingById(schedulingId: string){
    let scheduling = await this.schedulingReadSevice.findById(schedulingId);
    console.log(scheduling);
    this.schedulingInformation = scheduling;
  }
}