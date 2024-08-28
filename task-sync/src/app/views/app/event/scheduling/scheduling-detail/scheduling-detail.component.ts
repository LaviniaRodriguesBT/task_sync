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
export class SchedulingDetailComponent implements OnInit {

  schedulingInformation?: Scheduling;
  eventId: string = '';

  constructor(private activatedRoute: ActivatedRoute,
    private schedulingReadSevice: SchedulingReadService) { }

  ngOnInit(): void {
    this.eventId = this.activatedRoute.snapshot.paramMap.get('eventId')!;
    let schedulingId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(`ID do cronograma: ${schedulingId}`);
    this.loadSchedulingById(schedulingId!);

  }

  async loadSchedulingById(schedulingId: string) {
    let scheduling = await this.schedulingReadSevice.findById(schedulingId);
    console.log(scheduling);
    this.schedulingInformation = scheduling;
  }
}